import { mqttService, TOPIC_PREFIX } from './mqtt-service';

//export const isMockMode() = false; // <<-- MQTT disabled dulu
import { getMode, isMockMode, isSimMode, isMqttMode } from './mode';

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

// (opsional) deklarasi global utk TS (hanya dipakai saat isMockMode()=false)
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

  private simulationInterval?: number;

  private startSimulation() {
    this.simulationInterval && clearInterval(this.simulationInterval);

    this.simulationInterval = window.setInterval(() => {
      this.devices.forEach((dev) => {
        if (dev.type === 'sensor') {
          const low = dev.ranges?.low ?? 20;
          const high = dev.ranges?.high ?? 100;

          const mid = (low + high) / 2;
          const deviation = 0.05 * mid; // 5% dari mid

          const r = Math.random() * 2 - 1; // r ∈ [-1, 1]
          const simulated = mid + r * deviation;

          dev.value = Number(simulated.toFixed(2));
        }
      });
      this.emit();
    }, 2000);
  }

  private stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = undefined;
    }
  }

  /** Inisialisasi: selalu muat katalog dari mock, lalu opsional sambung MQTT */
  async init(force = false) {
    if (this.ready && !force) return;

    this.devices.clear(); // Pastikan tidak ada sisa sebelumnya

    this.stopSimulation(); // 🔴 Hentikan simulation jika masih jalan

    const mode = getMode();

    await this.loadMock();

    if (mode === 'mqtt') {
      await this.connectMqtt();
    } else if (mode === 'sim') {
      this.startSimulation();
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
    if (isMockMode()) return;

    await mqttService.connect();

    mqttService.onMessage((topic, rawPayload) => {
      try {
        const msg = rawPayload.trim();
        const parts = topic.split('/'); // taniverse/devices/<TAG>/value|state
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
      } catch (err) {
        console.error('[devicesStore] ❌ Error parsing MQTT message:', err);
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

  getAllTags(): string[] {
    return [...this.devices.keys()];
  }

  setActuatorState(tag: string, next: 'ON' | 'OFF') {
    const d = this.devices.get(tag);
    if (!d || d.type !== 'actuator') return;

    d.state = next;
    this.emit();

    if (!isMockMode() && mqttService.isReady()) {
      mqttService.publish(`${TOPIC_PREFIX}/${tag}/set`, next);
    }
  }

  /** Untuk demo saat isMockMode() = true */
  setSensorValue(tag: string, value: number) {
    const d = this.devices.get(tag);
    if (d && d.type === 'sensor') {
      d.value = value;
      this.emit();
    }
  }

  getMode() {
    return isMockMode() ? 'mock' : 'mqtt';
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
      if (!res.ok) {
        console.warn(
          `[devicesStore] ⚠️ Tidak bisa fetch dari ${url} (status: ${res.status})`
        );
        continue;
      }

      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.devices)
        ? (data as any).devices
        : null;

      if (Array.isArray(list)) {
        return list as Device[];
      } else {
        console.warn(`[devicesStore] ❌ Format tidak dikenali di: ${url}`);
      }
    } catch (err) {
      console.error(`[devicesStore] ❌ Gagal load dari ${url}:`, err);
    }
  }

  throw new Error(
    '❌ Tidak menemukan mock devices.json di lokasi kandidat mana pun.'
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
