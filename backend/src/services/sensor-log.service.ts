import { SQLite } from '../db/sqlite';

export interface SensorLog {
  id?: number;
  tagNumber: string;
  value: number;
  timestamp: number; // UNIX epoch in milliseconds
}

export class SensorLogService {
  static insert(log: SensorLog): number {
    const stmt = SQLite.db.prepare(`
      INSERT INTO sensor_logs (tagNumber, value, timestamp)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(log.tagNumber, log.value, log.timestamp);
    return result.lastInsertRowid as number;
  }

  static getRecent(tagNumber: string, limit = 100): SensorLog[] {
    const stmt = SQLite.db.prepare(`
      SELECT * FROM sensor_logs
      WHERE tagNumber = ?
      ORDER BY timestamp DESC
      LIMIT ?
    `);
    return stmt.all(tagNumber, limit) as SensorLog[];
  }

  static getRange(tagNumber: string, start: number, end: number): SensorLog[] {
    const stmt = SQLite.db.prepare(`
      SELECT * FROM sensor_logs
      WHERE tagNumber = ?
        AND timestamp BETWEEN ? AND ?
      ORDER BY timestamp ASC
    `);
    return stmt.all(tagNumber, start, end) as SensorLog[];
  }

  static bulkInsert(logs: SensorLog[]): number {
    if (!logs?.length) return 0;
    const stmt = SQLite.db.prepare(`
    INSERT INTO sensor_logs (tagNumber, value, timestamp)
    VALUES (?, ?, ?)
  `);
    const tx = SQLite.db.transaction((rows: SensorLog[]) => {
      for (const r of rows) stmt.run(r.tagNumber, r.value, r.timestamp);
    });
    tx(logs);
    return logs.length;
  }

  static pruneOlderThan(days: number) {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    SQLite.db
      .prepare(`DELETE FROM sensor_logs WHERE timestamp < ?`)
      .run(cutoff);
  }
}
