// models/device.model.ts

export type DeviceType = 'sensor' | 'actuator';
export type BusType = 'adc' | 'i2c' | 'gpio';

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

export interface DeviceStatus {
  mqtt: 'connected' | 'disconnected';
  valueStatus?: 'normal' | 'low-alarm' | 'high-alarm' | 'sensor-fail';
  lastSeen?: string; // ISO timestamp
}

export interface DeviceFlatModel {
  tagNumber: string;
  type: DeviceType;
  description: string;
  unit: string | null;
  writable: boolean;
  location: string;

  // ✅ Flattened ranges
  ranges_low: number | null;
  ranges_high: number | null;

  // ✅ Flattened alarms
  alarms_low: number | null;
  alarms_high: number | null;

  // ✅ Flattened IO
  io_bus: BusType;
  io_pin?: number | null;
  io_address?: string | null;
  io_channel?: number | null;

  // ✅ Flattened sampling
  sample_periodMs: number;
  sample_deadband: number;

  // ✅ Flattened display
  display_precision: number;

  // Actuator control
  allowedStates?: string[];
  defaultState?: string;

  // Runtime
  value?: number;
  state?: string;
  status?: DeviceStatus;
}

export const defaultDeviceModel: DeviceFlatModel = {
  tagNumber: '',
  type: 'sensor',
  description: '',
  unit: null,
  writable: false,
  location: '',

  ranges_low: null,
  ranges_high: null,

  alarms_low: null,
  alarms_high: null,

  io_bus: 'adc',
  io_pin: null,
  io_address: null,
  io_channel: null,

  sample_periodMs: 1000,
  sample_deadband: 0,

  display_precision: 1,

  allowedStates: [],
  defaultState: '',

  value: undefined,
  state: undefined,
  status: undefined,
};
