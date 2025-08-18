import mqtt from 'mqtt';
export const DEVICES_MOCK = false; // <<-- MQTT disabled dulu

// Dipakai jika DEVICES_MOCK = false
export const MQTT_BROKER_URL = 'ws://localhost:9001';
export const TOPIC_PREFIX = 'taniverse/devices';

/* ================== Tipe Data ================== */
export type Device =
  | (Sensor & { type: 'sensor' })
  | (Actuator & { type: 'actuator' });

export type BaseDevice = {
  tagNumber: string;
  type: 'sensor' | 'actuator';
  description: string;
  unit: string | null;
  ranges?: { low: number | null; high: number | null };
  alarms?: { low: number | null; high: number | null };
  kind: string | null;
};

export type Sensor = BaseDevice & {
  type: 'sensor';
  writable: false;
  value: number | null;
};

export type Actuator = BaseDevice & {
  type: 'actuator';
  writable: true;
  allowedStates: string[];
  defaultState: string;
  state: 'ON' | 'OFF';
};

type Listener = () => void;

// (opsional) deklarasi global utk TS (hanya dipakai saat DEVICES_MOCK=false)
declare global {
  interface Window {
    mqtt?: {
      connect: (url: string, opts?: any) => any;
    };
  }
}

/* ============== Store Perangkat ============== */
class DevicesStore {
  private devices = new Map<string, Device>();
  private listeners = new Set<Listener>();
  private ready = false;

  // MQTT (opsional)
  private mqttClient: any | null = null;

  /** Inisialisasi: selalu muat katalog dari mock, lalu opsional sambung MQTT */
  async init() {
    if (this.ready) return;

    await this.loadMock(); // katalog + nilai awal saat mock

    if (!DEVICES_MOCK) {
      await this.connectMqtt();
    }

    this.ready = true;
    this.emit();
  }

  private async loadMock() {
    try {
      const list = await readMockDevices();
      list.forEach((d) => this.devices.set(d.tagNumber, d));
    } catch (err) {
      console.error('[devices] loadMock gagal:', err);
    }
  }

  private async connectMqtt() {
    if (DEVICES_MOCK) return; // safety
    // if (!window.mqtt) {
    //   console.error(
    //     '[devices] MQTT tidak tersedia. Tambahkan <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"> di index.html'
    //   );
    //   return;
    // }

    this.mqttClient = mqtt.connect(MQTT_BROKER_URL, {
      clean: true,
      reconnectPeriod: 2000,
    });

    this.mqttClient.on('connect', () => {
      this.mqttClient.subscribe(`${TOPIC_PREFIX}/+/value`);
      this.mqttClient.subscribe(`${TOPIC_PREFIX}/+/state`);
    });

    this.mqttClient.on('message', (topic: string, payload: Uint8Array) => {
      try {
        const msg = new TextDecoder().decode(payload).trim();
        const parts = topic.split('/'); // taniverse devices <TAG> value/state
        const tag = parts[2];
        const leaf = parts[3];
        const dev = this.devices.get(tag);
        if (!dev) return;

        if (dev.type === 'sensor' && leaf === 'value') {
          dev.value = parseValue(msg);
        } else if (dev.type === 'actuator' && leaf === 'state') {
          dev.state = parseState(msg);
        }
        this.emit();
      } catch {
        /* ignore */
      }
    });
  }

  // ===== API untuk UI =====
  onChange(cb: Listener) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
  private emit() {
    this.listeners.forEach((cb) => cb());
  }

  get(tag: string) {
    return this.devices.get(tag);
  }

  setActuatorState(tag: string, next: 'ON' | 'OFF') {
    const d = this.devices.get(tag);
    if (!d || d.type !== 'actuator') return;

    // Update optimistik (mock & mqtt)
    d.state = next;
    this.emit();

    // Kirim ke device bila MQTT aktif
    if (!DEVICES_MOCK && this.mqttClient) {
      this.mqttClient.publish(`${TOPIC_PREFIX}/${tag}/set`, next);
    }
  }

  /** Untuk demo saat DEVICES_MOCK = true */
  setSensorValue(tag: string, value: number) {
    const d = this.devices.get(tag);
    if (d && d.type === 'sensor') {
      d.value = value;
      this.emit();
    }
  }

  getMode() {
    return DEVICES_MOCK ? 'mock' : 'mqtt';
  }
}

/* ============== Helpers ENV & loader mock ============== */
function detectBasePath(): string {
  // 1) coba baca env (kalau ada esbuild/define)
  const ENV =
    (typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV) ||
    'development';

  // 2) deteksi subpath dari URL (mis. /taniverse/)
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const m = path.match(/^\/([^/]+)\//); // segmen pertama
  const sub = m ? `/${m[1]}/` : '/';

  if (ENV === 'pre-release') return sub; // mis. /taniverse/
  if (ENV === 'production') return ''; // relative
  return '/'; // dev default
}

async function readMockDevices(): Promise<Device[]> {
  const BASE = detectBasePath();

  const candidates = [
    `${BASE}assets/mock/devices.json`, // hasil build (vite/esbuild)
    `${BASE}src/assets/mock/devices.json`, // serve source (live-server)
    `${BASE}mock/devices.json`, // folder publik
    `${BASE}devices.json`, // root fallback
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;

      const data = await res.json();
      // Terima berbagai bentuk: array langsung, atau { devices: [...] }
      const list = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.devices)
        ? (data as any).devices
        : null;

      if (Array.isArray(list)) return list as Device[];
    } catch {
      // lanjut kandidat berikutnya
    }
  }

  throw new Error(
    'Tidak menemukan mock devices.json di lokasi kandidat mana pun.'
  );
}

/* ============== Utils parsing payload ============== */
function parseValue(s: string): number | null {
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  try {
    const o = JSON.parse(s);
    if (typeof o.value === 'number') return o.value;
  } catch {}
  return null;
}

function parseState(s: string): 'ON' | 'OFF' {
  return s.toUpperCase() === 'ON' ? 'ON' : 'OFF';
}

export const devicesStore = new DevicesStore();
