// backend/src/services/device.service.ts

import { SQLite } from '../db/sqlite';
import type { DeviceModel } from '@models/device.model';

/** Helper konversi boolean ke int */
const boolToInt = (b: boolean) => (b ? 1 : 0);
const intToBool = (i: number) => i === 1;

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
  static getAll(): DeviceModel[] {
    const rows = SQLite.db.prepare(`SELECT * FROM devices`).all();
    return rows.map(this.rowToDevice);
  }

  /** Ambil 1 device by tagNumber */
  static get(tagNumber: string): DeviceModel | null {
    const row = SQLite.db
      .prepare(`SELECT * FROM devices WHERE tagNumber = ?`)
      .get(tagNumber);
    return row ? this.rowToDevice(row) : null;
  }

  /** Insert/Update (UPSERT) 1 device */
  static upsert(dev: DeviceModel): DeviceModel {
    const stmt = SQLite.db.prepare(`
      INSERT INTO devices (
        tagNumber, type, description, unit,
        kind, writable, defaultState, state, value,
        ranges_low, ranges_high,
        alarms_low, alarms_high,
        allowedStates,
        io_bus, io_pin, io_address, io_channel,
        sample_periodMs, sample_deadband,
        display_precision,
        location, mqtt, meta
      ) VALUES (
        @tagNumber, @type, @description, @unit,
        @kind, @writable, @defaultState, @state, @value,
        @ranges_low, @ranges_high,
        @alarms_low, @alarms_high,
        @allowedStates,
        @io_bus, @io_pin, @io_address, @io_channel,
        @sample_periodMs, @sample_deadband,
        @display_precision,
        @location, @mqtt, @meta
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
        ranges_low = excluded.ranges_low,
        ranges_high = excluded.ranges_high,
        alarms_low = excluded.alarms_low,
        alarms_high = excluded.alarms_high,
        allowedStates = excluded.allowedStates,
        io_bus = excluded.io_bus,
        io_pin = excluded.io_pin,
        io_address = excluded.io_address,
        io_channel = excluded.io_channel,
        sample_periodMs = excluded.sample_periodMs,
        sample_deadband = excluded.sample_deadband,
        display_precision = excluded.display_precision,
        location = excluded.location,
        mqtt = excluded.mqtt,
        meta = excluded.meta
    `);

    const payload = {
      ...dev,
      writable: boolToInt(dev.writable),
      allowedStates: JSON.stringify(dev.allowedStates ?? []),
      mqtt: JSON.stringify(dev.mqtt_json ?? {}),
      meta: JSON.stringify(dev.meta_json ?? {}),
      location: JSON.stringify(dev.location ?? {}),
    };

    stmt.run(payload);
    return this.get(dev.tagNumber)!;
  }

  /** Bulk upsert */
  static bulkUpsert(devices: DeviceModel[]): number {
    const tx = SQLite.db.transaction((list: DeviceModel[]) => {
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

  /** Map row DB -> DeviceModel */
  private static rowToDevice(row: any): DeviceModel {
    return {
      tagNumber: row.tagNumber,
      type: row.type,
      description: row.description,
      unit: row.unit ?? null,
      kind: row.kind ?? null,
      writable: intToBool(row.writable),
      defaultState: row.defaultState ?? '',
      state: row.state ?? undefined,
      value:
        row.value !== null && row.value !== undefined
          ? Number(row.value)
          : undefined,

      ranges_low: row.ranges_low ?? null,
      ranges_high: row.ranges_high ?? null,

      alarms_low: row.alarms_low ?? null,
      alarms_high: row.alarms_high ?? null,

      allowedStates: fromJSON<string[]>(row.allowedStates) ?? [],

      io_bus: row.io_bus ?? 'adc',
      io_pin: row.io_pin ?? null,
      io_address: row.io_address ?? null,
      io_channel: row.io_channel ?? null,

      sample_periodMs: row.sample_periodMs ?? 1000,
      sample_deadband: row.sample_deadband ?? 0,

      display_precision: row.display_precision ?? 1,

      location: fromJSON(row.location) ?? {},
      mqtt: fromJSON(row.mqtt) ?? {},
      meta: fromJSON(row.meta) ?? {},
    };
  }
}
