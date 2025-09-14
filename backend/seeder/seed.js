// backend/seeder/seed.js

const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

// Global DB instance
let db;

// Path constants
const DB_PATH = path.resolve(__dirname, '../data/taniverse.db');
const JSON_FOLDER = path.resolve(__dirname, '../../frontend/src/assets/mock');
const SALT_ROUNDS = 10;

// Entry point
(async () => {
  const args = parseArgs();
  db = new Database(DB_PATH);

  if (args.assess) {
    await assess(args);
  } else {
    await seed(args);
  }

  db.close();
})();

// =====================
// SEED FUNCTION
// =====================
async function seed({
  only = null,
  backup = false,
  mode = 'replace',
  force = false,
}) {
  const destructive = mode === 'replace';
  const processedTables = [];

  try {
    const files = await fs.readdir(JSON_FOLDER);

    if (destructive && !force) {
      console.warn(
        `\n❌ MODE 'replace' membutuhkan '--force' untuk melanjutkan.`
      );
      process.exit(1);
    }

    if (backup && destructive) {
      await createBackup();
    }

    console.log(`\n📁 MEMULAI SEEDING DATABASE dari: ${JSON_FOLDER}\n`);

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const fileName = path.basename(file, '.json');
      const tableName = fileName.replace(/-/g, '_');
      if (only && tableName !== only) continue;

      const filePath = path.join(JSON_FOLDER, file);
      const rawJson = await fs.readJson(filePath);
      const rawData = Array.isArray(rawJson)
        ? rawJson
        : rawJson[fileName] || rawJson[tableName] || rawJson.data || [];

      console.log(`🔎 [SEED] ${file} → ${tableName}`);
      if (!Array.isArray(rawData) || rawData.length === 0) {
        console.warn(`⚠️  SKIP: file kosong atau tidak valid.\n`);
        continue;
      }

      const columns = Object.keys(rawData[0]);
      console.log(`   📐 JSON Columns: ${columns.join(', ')}`);

      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS "${tableName}" (
          ${columns.map((col) => `"${col}" TEXT`).join(', ')}
        );
      `;
      runSQL(createTableSQL);
      console.log(`   ✅ Tabel '${tableName}' disiapkan.`);

      const dbColumns = getExistingTableColumns(tableName);
      const mismatch = columns.some((col) => !dbColumns.includes(col));
      if (mismatch) {
        console.error(
          `❌ STRUKTUR JSON tidak cocok dengan tabel '${tableName}'`
        );
        process.exit(1);
      }

      if (mode === 'replace') {
        runSQL(`DELETE FROM "${tableName}"`);
        console.log(`   ♻️  Data lama dihapus.`);
      } else if (mode === 'safe') {
        const count = getRowCount(tableName);
        if (count > 0) {
          console.warn(`   ⛔ Skip: '${tableName}' sudah berisi data.`);
          continue;
        }
      }

      const placeholders = columns.map(() => '?').join(', ');
      const insertSQL = `INSERT INTO "${tableName}" (${columns.join(
        ', '
      )}) VALUES (${placeholders})`;
      const stmt = db.prepare(insertSQL);

      let inserted = 0;
      for (const row of rawData) {
        const cloned = { ...row };

        if (tableName === 'users' && cloned.passwordHash) {
          console.log(`   🔐 Hashing password user '${cloned.username}'`);
          cloned.passwordHash = await bcrypt.hash(
            cloned.passwordHash,
            SALT_ROUNDS
          );
        }

        // 🕒 Tambahkan createdAt dan updatedAt jika belum ada
        if (tableName === 'users') {
          if (!('createdAt' in cloned)) {
            cloned.createdAt = new Date().toISOString();
          }
          if (!('updatedAt' in cloned)) {
            cloned.updatedAt = new Date().toISOString();
          }
        }

        const values = columns.map((col) => cloned[col] ?? null);
        stmt.run(values);
        inserted++;
      }

      console.log(`   ✅ ${inserted} baris dimasukkan ke '${tableName}'\n`);
      processedTables.push({ tableName, inserted });
    }

    console.log(`📦 Ringkasan Sukses:`);
    processedTables.forEach((t) => {
      console.log(`📌 ${t.tableName}: ${t.inserted} baris`);
    });
  } catch (err) {
    console.error('❌ ERROR:', err);
  }
}

// =====================
// ASSESS FUNCTION
// =====================
async function assess({ only = null }) {
  const files = await fs.readdir(JSON_FOLDER);
  let match = 0,
    mismatch = 0;

  console.log(`\n📋 [ASSESSMENT MODE] Struktur JSON vs Tabel di DB\n`);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const fileName = path.basename(file, '.json');
    const tableName = fileName.replace(/-/g, '_');
    if (only && tableName !== only) continue;

    const filePath = path.join(JSON_FOLDER, file);
    const rawJson = await fs.readJson(filePath);
    const rawData = Array.isArray(rawJson)
      ? rawJson
      : rawJson[fileName] || rawJson[tableName] || rawJson.data || [];

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn(`⚠️  SKIP: '${file}' kosong`);
      continue;
    }

    const jsonCols = Object.keys(rawData[0]);
    const tableExists = checkTableExists(tableName);

    console.log(`🔍 ${file} → ${tableName}`);
    console.log(`   📐 JSON: ${jsonCols.join(', ')}`);

    if (!tableExists) {
      console.warn(`   ⛔ Tabel '${tableName}' belum ada`);
      mismatch++;
      continue;
    }

    const dbCols = getExistingTableColumns(tableName);
    console.log(`   🏗️  DB  : ${dbCols.join(', ')}`);

    const missing = jsonCols.filter((c) => !dbCols.includes(c));
    const extra = dbCols.filter((c) => !jsonCols.includes(c));

    if (missing.length === 0 && extra.length === 0) {
      console.log(`   ✅ MATCH\n`);
      match++;
    } else {
      console.warn(`   ❌ MISMATCH`);
      if (missing.length)
        console.warn(`     + JSON → DB missing: ${missing.join(', ')}`);
      if (extra.length)
        console.warn(`     + DB → JSON extra  : ${extra.join(', ')}`);
      console.log('');
      mismatch++;
    }
  }

  console.log(`📊 Summary: ${match} cocok, ${mismatch} tidak cocok\n`);
}

// =====================
// HELPERS
// =====================
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    only: getArg('--only'),
    backup: args.includes('--backup'),
    force: args.includes('--force'),
    assess: args.includes('--assess'),
    mode: getArg('--mode') || 'replace',
  };

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1] : null;
  }
}

function runSQL(sql) {
  db.prepare(sql).run();
}

function getRowCount(tableName) {
  return db.prepare(`SELECT COUNT(*) AS count FROM "${tableName}"`).get().count;
}

function getExistingTableColumns(tableName) {
  return db
    .prepare(`PRAGMA table_info("${tableName}")`)
    .all()
    .map((r) => r.name);
}

function checkTableExists(tableName) {
  return !!db
    .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
    .get(tableName);
}

async function createBackup() {
  const backupDir = path.resolve(__dirname, '../data/backups');
  await fs.ensureDir(backupDir);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `taniverse-${timestamp}.db`);
  await fs.copy(DB_PATH, backupPath);
  console.log(`\n📦 Backup dibuat: ${backupPath}\n`);
}
