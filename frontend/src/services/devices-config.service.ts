// CRUD + validasi untuk konfigurasi (bukan runtime MQTT)
// Simpan ke LocalStorage saat dev; load awal dari assets/mock/devices.json

import type { DeviceConfig } from '../../../models/device.model';

export type ValidationError = { field: string; message: string };

const LS_KEY = 'mock.devices.config';
let _cache: DeviceConfig<any>[] | null = null;

export async function loadDevices<T = {}>(): Promise<DeviceConfig<T>[]> {
  if (_cache) return _cache as DeviceConfig<T>[];
  const ls = localStorage.getItem(LS_KEY);
  if (ls) {
    _cache = JSON.parse(ls);
    return _cache as DeviceConfig<T>[];
  }
  _cache = await readMockDevicesCfg();
  localStorage.setItem(LS_KEY, JSON.stringify(_cache));
  return _cache as DeviceConfig<T>[];
}

export function getByTag<T = {}>(tag: string): DeviceConfig<T> | undefined {
  return _cache?.find((d) => d.tagNumber === tag) as any;
}

export function upsertDevice<T = {}>(device: DeviceConfig<T>): void {
  if (!_cache) throw new Error('loadDevices() belum dipanggil');
  const i = _cache.findIndex((d) => d.tagNumber === device.tagNumber);
  const now = new Date().toISOString();
  if (i >= 0) device.meta = { ...device.meta, updatedAt: now };
  else device.meta = device.meta ?? { createdAt: now, updatedAt: now };
  if (i >= 0) _cache[i] = device as any;
  else _cache.push(device as any);
  localStorage.setItem(LS_KEY, JSON.stringify(_cache));
}

export function validateDevice<T = {}>(
  d: DeviceConfig<T>,
  isNew: boolean
): ValidationError[] {
  const errs: ValidationError[] = [];
  if (!d.tagNumber) errs.push({ field: 'tagNumber', message: 'Tag wajib' });
  if (isNew && _cache?.some((x) => x.tagNumber === d.tagNumber))
    errs.push({ field: 'tagNumber', message: 'Tag sudah dipakai' });
  if (!d.type) errs.push({ field: 'type', message: 'Type wajib' });

  // ranges
  if (d.ranges) {
    const lo = d.ranges.low ?? null,
      hi = d.ranges.high ?? null;
    if (lo !== null && hi !== null && Number(lo) >= Number(hi))
      errs.push({ field: 'ranges.high', message: 'High harus > Low' });
  }
  // alarms in range
  if (d.alarms && d.ranges && d.ranges.low !== null && d.ranges.high !== null) {
    const { low: rL, high: rH } = d.ranges;
    const { low: aL, high: aH } = d.alarms;
    if (aL !== null && (aL < (rL as number) || aL > (rH as number)))
      errs.push({ field: 'alarms.low', message: 'Alarm low di luar range' });
    if (aH !== null && (aH < (rL as number) || aH > (rH as number)))
      errs.push({ field: 'alarms.high', message: 'Alarm high di luar range' });
    if (aL !== null && aH !== null && aL >= aH)
      errs.push({
        field: 'alarms.high',
        message: 'Alarm high harus > alarm low',
      });
  }

  // MQTT
  if (!d.mqtt?.topic)
    errs.push({ field: 'mqtt.topic', message: 'MQTT topic wajib' });

  // Actuator
  if (d.type === 'actuator') {
    if (!d.allowedStates || d.allowedStates.length === 0)
      errs.push({ field: 'allowedStates', message: 'allowedStates wajib' });
    if (
      d.defaultState &&
      d.allowedStates &&
      !d.allowedStates.includes(d.defaultState)
    )
      errs.push({
        field: 'defaultState',
        message: 'defaultState harus ada di allowedStates',
      });
    if (!d.writable)
      errs.push({ field: 'writable', message: 'Actuator harus writable' });
  }

  // IO
  if (!d.io?.bus) errs.push({ field: 'io.bus', message: 'Bus wajib' });
  if (d.io.bus === 'gpio' && (d.io.pin === null || Number.isNaN(d.io.pin)))
    errs.push({ field: 'io.pin', message: 'GPIO pin wajib' });
  if (d.io.bus === 'i2c' && !d.io.address)
    errs.push({ field: 'io.address', message: 'I2C address wajib' });
  if (
    d.io.bus === 'adc' &&
    (d.io.channel === null || Number.isNaN(d.io.channel))
  )
    errs.push({ field: 'io.channel', message: 'ADC channel wajib' });

  return errs;
}

// ------- loader mock dengan auto path detection (mirip servicemu) -------
async function readMockDevicesCfg(): Promise<DeviceConfig<any>[]> {
  const ENV = (process.env.NODE_ENV as string) || 'development';
  const BASE =
    ENV === 'pre-release' ? '/taniverse/' : ENV === 'production' ? '' : '/';
  //const BASE = detectBasePath();
  const candidates = [
    `${BASE}assets/mock/devices.json`,
    `${BASE}src/assets/mock/devices.json`,
    `${BASE}mock/devices.json`,
    `${BASE}devices.json`,
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.devices)
        ? (data as any).devices
        : null;
      if (Array.isArray(list)) return list as DeviceConfig<any>[];
    } catch {
      /* next */
    }
  }
  throw new Error('Tidak menemukan mock devices.json untuk CONFIG.');
}

function detectBasePath(): string {
  const ENV =
    (typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV) ||
    'development';
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const m = path.match(/^\/([^/]+)\//);
  const sub = m ? `/${m[1]}/` : '/';
  if (ENV === 'pre-release') return sub;
  if (ENV === 'production') return '';
  return '/';
}
