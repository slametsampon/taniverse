// frontend/src/services/devices-config.service.ts

// CRUD + validasi untuk konfigurasi device (bukan runtime MQTT)
// DEFAULT: pakai HTTP → Fastify + SQLite (lihat VITE_API_BASE)
// Fallback dev: LocalStorage + mock JSON jika USE_HTTP=false

import type { DeviceConfig } from '@models/device.model';

export type ValidationError = { field: string; message: string };

/* ================== Konfigurasi sumber data ================== */
const USE_HTTP = true; // ← set ke false jika ingin kembali ke LocalStorage/mock saat dev
export const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080/api';

// LocalStorage key (fallback dev)
const LS_KEY = 'mock.devices.config';

/* ================== Cache in-memory ================== */
const cache = new Map<string, DeviceConfig<any>>();

/* ================== HTTP helper ================== */
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const hasBody = init && 'body' in (init as any) && (init as any).body != null;

  const headers: HeadersInit = hasBody
    ? { 'Content-Type': 'application/json', ...(init?.headers as any) }
    : (init?.headers as any) ?? {};

  const res = await fetch(`${API_BASE}${path}`, {
    cache: 'no-cache',
    ...init,
    headers,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  // handle 204/empty body
  if (res.status === 204) return undefined as unknown as T;
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

/* ================== API untuk UI ================== */
export async function loadDevices<T = {}>(): Promise<DeviceConfig<T>[]> {
  if (USE_HTTP) {
    console.warn('[cfg] loadDevices via HTTP →', API_BASE);
    const list = await http<DeviceConfig<any>[]>('/devices');
    cache.clear();
    list.forEach((d) => cache.set(d.tagNumber, d));
    return list as DeviceConfig<T>[];
  }

  // fallback dev: LocalStorage → mock JSON
  const ls = localStorage.getItem(LS_KEY);
  if (ls) {
    const arr = JSON.parse(ls) as DeviceConfig<any>[];
    cache.clear();
    arr.forEach((d) => cache.set(d.tagNumber, d));
    return arr as DeviceConfig<T>[];
  }
  const arr = await readMockDevicesCfg();
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  cache.clear();
  arr.forEach((d) => cache.set(d.tagNumber, d));
  return arr as DeviceConfig<T>[];
}

export function getByTag<T = {}>(tag: string): DeviceConfig<T> | undefined {
  return cache.get(tag) as any;
}

export async function upsertDevice<T = {}>(
  device: DeviceConfig<T>
): Promise<DeviceConfig<T>> {
  // stamp waktu update di FE (backend boleh override lagi)
  const now = new Date().toISOString();
  device.meta = {
    createdAt: device.meta?.createdAt ?? now,
    updatedAt: now,
  } as any;

  if (USE_HTTP) {
    const exists = cache.has(device.tagNumber);
    const saved = exists
      ? await http<DeviceConfig<any>>(
          `/devices/${encodeURIComponent(device.tagNumber)}`,
          { method: 'PUT', body: JSON.stringify(device) }
        )
      : await http<DeviceConfig<any>>('/devices', {
          method: 'POST',
          body: JSON.stringify(device),
        });
    cache.set(saved.tagNumber, saved);
    return saved as DeviceConfig<T>;
  }

  // fallback dev: LocalStorage
  const arr = Array.from(cache.values());
  const i = arr.findIndex((d) => d.tagNumber === device.tagNumber);
  if (i >= 0) arr[i] = device as any;
  else arr.push(device as any);
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  cache.clear();
  arr.forEach((d) => cache.set(d.tagNumber, d));
  return device;
}

export async function deleteDevice(tag: string): Promise<boolean> {
  // gunakan helper http tanpa body, jadi tidak ada Content-Type
  await http<{ deleted: string }>(`/devices/${encodeURIComponent(tag)}`, {
    method: 'DELETE',
  });
  cache.delete(tag);
  return true;
}

/* ================== Validasi ================== */
export function validateDevice<T = {}>(
  d: DeviceConfig<T>,
  isNew: boolean
): ValidationError[] {
  const errs: ValidationError[] = [];

  // wajib dasar
  if (!d.tagNumber) errs.push({ field: 'tagNumber', message: 'Tag wajib' });
  if (!d.type) errs.push({ field: 'type', message: 'Type wajib' });
  if (!d.description || !String(d.description).trim())
    errs.push({ field: 'description', message: 'Deskripsi wajib' });

  // unik saat NEW → cek dari cache (yang diisi loadDevices())
  if (isNew && cache.has(d.tagNumber)) {
    errs.push({ field: 'tagNumber', message: 'Tag sudah dipakai' });
  }

  // ranges
  if (d.ranges) {
    const lo = d.ranges.low ?? null,
      hi = d.ranges.high ?? null;
    if (lo !== null && hi !== null && Number(lo) >= Number(hi))
      errs.push({ field: 'ranges.high', message: 'High harus > Low' });
  }

  // alarms di dalam range
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

/* ================== Loader mock (fallback dev) ================== */
async function readMockDevicesCfg(): Promise<DeviceConfig<any>[]> {
  const ENV = (process.env.NODE_ENV as string) || 'development';
  const BASE =
    ENV === 'pre-release' ? '/taniverse/' : ENV === 'production' ? '' : '/';
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
