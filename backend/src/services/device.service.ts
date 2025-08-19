import { SQLite } from '../db/sqlite';
import type { DeviceConfig } from '@models/device.model';

/** Helper konversi boolean ke int */
const boolToInt = (b: boolean) => (b ? 1 : 0);
const intToBool = (i: number) => i === 1;

/** Serialize nested object -> JSON string (null/undefined aman) */
function toJSON(v: unknown): string | null {
  if (v === undefined || v === null) return null;
  return JSON.stringify(v);
}

/** Parse JSON string -> object (null aman) */
function fromJSON<T>(s: unknown): T | undefined {
  if (typeof s !== 'string' || s.length === 0) return undefined;
  try {
    return JSON.parse(s) as T;
  } catch {
    return undefined;
  }
}

export class DeviceService {
  /** Ambil semua device */
  static getAll(): DeviceConfig[] {
    const rows = SQLite.db.prepare(`SELECT * FROM devices`).all();
    return rows.map(this.rowToDevice);
  }

  /** Ambil 1 device by tagNumber */
  static get(tagNumber: string): DeviceConfig | null {
    const row = SQLite.db
      .prepare(`SELECT * FROM devices WHERE tagNumber = ?`)
      .get(tagNumber);
    return row ? this.rowToDevice(row) : null;
  }

  /** Insert/Update (UPSERT) 1 device */
  static upsert(dev: DeviceConfig): DeviceConfig {
    // siapkan payload untuk kolom
    const stmt = SQLite.db.prepare(`
      INSERT INTO devices (
        tagNumber, type, description, unit,
        kind, writable, defaultState, state, value,
        ranges, alarms, allowedStates, io, mqtt, sample, display,
        location, meta
      ) VALUES (
        @tagNumber, @type, @description, @unit,
        @kind, @writable, @defaultState, @state, @value,
        @ranges, @alarms, @allowedStates, @io, @mqtt, @sample, @display,
        @location, @meta
      )
      ON CONFLICT(tagNumber) DO UPDATE SET
        type = excluded.type,
        description = excluded.description,
        unit = excluded.unit,
        kind = excluded.kind,
        writable = excluded.writable,
        defaultState = excluded.defaultState,
        state = excluded.state,
        value = excluded.value,
        ranges = excluded.ranges,
        alarms = excluded.alarms,
        allowedStates = excluded.allowedStates,
        io = excluded.io,
        mqtt = excluded.mqtt,
        sample = excluded.sample,
        display = excluded.display,
        location = excluded.location,
        meta = excluded.meta
    `);

    // serialize nested fields ke JSON TEXT
    const payload = {
      tagNumber: dev.tagNumber,
      type: dev.type,
      description: dev.description,
      unit: dev.unit ?? null,

      kind: dev.kind ?? null,
      writable: boolToInt(dev.writable),
      defaultState: dev.defaultState ?? null,

      // runtime opsional
      state: dev.state ?? null,
      value: dev.value ?? null,

      ranges: JSON.stringify(dev.ranges),
      alarms: JSON.stringify(dev.alarms),
      allowedStates: toJSON(dev.allowedStates),
      io: JSON.stringify(dev.io),
      mqtt: JSON.stringify(dev.mqtt),
      sample: toJSON(dev.sample),
      display: toJSON(dev.display),
      location: JSON.stringify(dev.location),
      meta: JSON.stringify(dev.meta),
    };

    stmt.run(payload);
    return this.get(dev.tagNumber)!;
  }

  /** Bulk upsert */
  static bulkUpsert(devices: DeviceConfig[]): number {
    const tx = SQLite.db.transaction((list: DeviceConfig[]) => {
      for (const d of list) this.upsert(d);
    });
    tx(devices);
    return devices.length;
  }

  /** Hapus device */
  static delete(tagNumber: string): boolean {
    const info = SQLite.db
      .prepare(`DELETE FROM devices WHERE tagNumber = ?`)
      .run(tagNumber);
    return info.changes > 0;
  }

  /** Map row DB -> DeviceConfig */
  private static rowToDevice(row: any): DeviceConfig {
    return {
      tagNumber: row.tagNumber,
      type: row.type,
      description: row.description,
      unit: row.unit ?? null,

      ranges: JSON.parse(row.ranges),
      alarms: JSON.parse(row.alarms),

      kind: row.kind ?? null,
      allowedStates: fromJSON<string[]>(row.allowedStates) ?? null,
      defaultState: row.defaultState ?? null,
      writable: intToBool(row.writable),

      io: JSON.parse(row.io),
      mqtt: JSON.parse(row.mqtt),

      sample: fromJSON(row.sample),
      display: fromJSON(row.display),

      location: JSON.parse(row.location),
      meta: JSON.parse(row.meta),

      // runtime (opsional)
      value:
        row.value !== null && row.value !== undefined
          ? Number(row.value)
          : undefined,
      state: row.state ?? undefined,
    };
  }
}
