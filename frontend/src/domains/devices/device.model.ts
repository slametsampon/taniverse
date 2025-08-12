export type DeviceType = 'sensor' | 'actuator';
export type BusType = 'adc' | 'i2c' | 'gpio';

export interface Ranges {
  low: number | null;
  high: number | null;
}
export interface Alarms {
  low: number | null;
  high: number | null;
}
export interface IO {
  bus: BusType;
  pin: number | null;
  address: string | null;
  channel: number | null;
}
export interface MQTT {
  topic: string;
  readCmd: string | null;
  writeCmd: string | null;
}
export interface Sample {
  periodMs: number;
  deadband: number;
}
export interface Display {
  precision: number;
}
export interface Location {
  area: string;
  position: string;
}
export interface Meta {
  createdAt: string;
  updatedAt: string;
}

/** Base konfigurasi device (dipakai page config) */
export interface DeviceBase {
  tagNumber: string;
  type: DeviceType;
  description: string;
  unit: string | null;

  ranges: Ranges; // sensor-friendly, boleh null di field-nya
  alarms: Alarms; // sensor-friendly, boleh null di field-nya

  kind: string | null; // actuator-friendly
  allowedStates: string[] | null;
  defaultState: string | null;
  writable: boolean;

  io: IO;
  mqtt: MQTT;

  sample?: Sample; // hanya sensor
  display?: Display; // hanya sensor

  location: Location;
  meta: Meta;

  // runtime (RO), opsional:
  value?: number; // sensor
  state?: string; // actuator
}

/** Generic untuk menambah field domain tanpa ganggu base */
export type DeviceConfig<TExtra = {}> = DeviceBase & TExtra;
