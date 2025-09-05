// models/device.model.ts

export type DeviceType = 'sensor' | 'actuator';
export type BusType = 'adc' | 'i2c' | 'gpio';

/** Nilai minimum & maksimum */
export interface Ranges {
  low: number | null;
  high: number | null;
}

/** Alarm ambang batas */
export interface Alarms {
  low: number | null;
  high: number | null;
}

/** Koneksi fisik ke ESP */
export interface IO {
  bus: BusType;
  pin?: number | null;
  address?: string | null;
  channel?: number | null;
}

/** Sampling untuk sensor */
export interface Sample {
  periodMs: number;
  deadband: number;
}

/** Format display nilai */
export interface Display {
  precision: number;
}

/** Status MQTT & sistem (diupdate saat runtime) */
export interface DeviceStatus {
  mqtt: 'connected' | 'disconnected';
  valueStatus?: 'normal' | 'low-alarm' | 'high-alarm' | 'sensor-fail';
  lastSeen?: string; // ISO timestamp
}

export interface UnitOption {
  label: string;
  value: string;
}

export const STANDARD_UNITS: UnitOption[] = [
  { label: '°C - Suhu', value: '°C' },
  { label: '% - Persentase', value: '%' },
  { label: 'cm - Panjang, Level, Ketinggian', value: 'cm' },
  { label: 'RH% - Kelembaban', value: 'RH%' },
  { label: 'm/s - Kecepatan', value: 'm/s' },
  { label: 'lux - Intensitas Cahaya', value: 'lux' },
  { label: 'ppm - Konsentrasi Gas', value: 'ppm' },
  { label: 'kPa - Tekanan', value: 'kPa' },
  { label: 'mV - Tegangan', value: 'mV' },
  { label: 'μS/cm - Konduktivitas', value: 'μS/cm' },
  { label: 'pH - Keasaman', value: 'pH' },
  { label: 'NTU - Kekeruhan', value: 'NTU' },
];

/** Konfigurasi utama perangkat */
export interface DeviceBase {
  tagNumber: string;
  type: DeviceType;
  description: string;
  unit: string | null;

  writable: boolean; // true → actuator

  ranges?: Ranges;
  alarms?: Alarms;

  allowedStates?: string[]; // actuator
  defaultState?: string; // actuator

  io: IO;

  sample?: Sample;
  display?: Display;

  location: string; // disederhanakan

  // runtime-only fields
  value?: number; // sensor
  state?: string; // actuator

  status?: DeviceStatus; // mqtt status, alarm status, dll
}

/** Extensible domain-friendly config */
export type DeviceConfig<TExtra = {}> = DeviceBase & TExtra;
