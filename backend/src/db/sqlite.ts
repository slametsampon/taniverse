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

      this.instance = new Database(config.DB_PATH);
      this.instance.pragma('journal_mode = WAL');
      this.migrate();
    }
    return this.instance;
  }

  private static migrate() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS devices (
        tagNumber TEXT PRIMARY KEY,          -- PK sesuai model
        type TEXT NOT NULL,                  -- 'sensor' | 'actuator'
        description TEXT NOT NULL,
        unit TEXT,                           -- nullable

        -- kolom boolean / ringan
        kind TEXT,                           -- nullable (actuator-friendly)
        writable INTEGER NOT NULL,           -- 0/1

        defaultState TEXT,                   -- nullable
        state TEXT,                          -- runtime (actuator), nullable
        value REAL,                          -- runtime (sensor), nullable

        -- JSON blobs (TEXT) untuk nested structures
        ranges TEXT NOT NULL,                -- JSON
        alarms TEXT NOT NULL,                -- JSON
        allowedStates TEXT,                  -- JSON array (nullable)
        io TEXT NOT NULL,                    -- JSON
        mqtt TEXT NOT NULL,                  -- JSON
        sample TEXT,                         -- JSON (sensor only)
        display TEXT,                        -- JSON (sensor only)
        location TEXT NOT NULL,              -- JSON
        meta TEXT NOT NULL                   -- JSON (punya createdAt/updatedAt)
      );
    `);
  }
}
