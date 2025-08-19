import Database from 'better-sqlite3';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { config } from '../config';

export class SQLite {
  private static instance: Database.Database;

  static get db(): Database.Database {
    if (!this.instance) {
      const dir = dirname(config.DB_PATH);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

      // OPSIONAL: log lokasi DB biar jelas di dev
      // eslint-disable-next-line no-console
      console.log(`[sqlite] using DB at: ${config.DB_PATH}`);

      this.instance = new Database(config.DB_PATH);

      // Pragma yang masuk akal untuk app embedded
      this.instance.pragma('journal_mode = WAL'); // write-ahead log
      this.instance.pragma('synchronous = NORMAL'); // kompromi durability vs speed
      this.instance.pragma('foreign_keys = ON'); // jaga integritas relasi (kalau dipakai)

      this.migrate();
    }
    return this.instance;
  }

  private static migrate() {
    // Jalankan dalam transaction supaya konsisten
    const tx = this.db.transaction(() => {
      // === devices (tetap seperti punyamu) ===
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS devices (
          tagNumber     TEXT PRIMARY KEY,          -- PK sesuai model
          type          TEXT NOT NULL,             -- 'sensor' | 'actuator'
          description   TEXT NOT NULL,
          unit          TEXT,                      -- nullable

          -- kolom boolean / ringan
          kind          TEXT,                      -- nullable (actuator-friendly)
          writable      INTEGER NOT NULL,          -- 0/1

          defaultState  TEXT,                      -- nullable
          state         TEXT,                      -- runtime (actuator), nullable
          value         REAL,                      -- runtime (sensor), nullable

          -- JSON blobs (TEXT) untuk nested structures
          ranges        TEXT NOT NULL,             -- JSON
          alarms        TEXT NOT NULL,             -- JSON
          allowedStates TEXT,                      -- JSON array (nullable)
          io            TEXT NOT NULL,             -- JSON
          mqtt          TEXT NOT NULL,             -- JSON
          sample        TEXT,                      -- JSON (sensor only)
          display       TEXT,                      -- JSON (sensor only)
          location      TEXT NOT NULL,             -- JSON
          meta          TEXT NOT NULL              -- JSON (punya createdAt/updatedAt)
        );
      `);

      // Index ringan untuk query umum (opsional)
      this.db.exec(`
        CREATE INDEX IF NOT EXISTS idx_devices_type ON devices(type);
      `);

      // === users (baru) ===
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          username     TEXT PRIMARY KEY,
          passwordHash TEXT NOT NULL,
          role         TEXT NOT NULL,              -- 'admin' | 'engineer' | 'operator' | 'guest'
          avatarUrl    TEXT,
          createdAt    INTEGER NOT NULL,
          updatedAt    INTEGER NOT NULL
        );
      `);

      // Index ringan untuk filter per role (opsional)
      this.db.exec(`
        CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      `);
    });

    tx(); // commit
  }
}
