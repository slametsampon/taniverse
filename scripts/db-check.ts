import { SQLite } from '../backend/src/db/sqlite';

const db = SQLite.db;

// cek semua tabel
const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table'")
  .all();
console.log(
  'Tables:',
  tables.map((t: any) => t.name)
);

// cek isi tabel users
const users = db.prepare('SELECT username, role FROM users').all();
console.log('Users:', users);

// cek isi tabel devices (opsional)
const devices = db
  .prepare('SELECT tagNumber, type, description FROM devices')
  .all();
console.log('Devices:', devices);
