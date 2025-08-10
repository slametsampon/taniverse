/**
 * ===== Konfigurasi App (khusus devices) =====
 * Set true untuk testing tanpa backend (pakai JSON statis devices.json).
 * Saat backend siap, ubah ke false agar pakai MQTT.
 */
export const DEVICES_MOCK = true;

// Dipakai jika DEVICES_MOCK = false
export const MQTT_BROKER_URL = 'ws://localhost:8083/mqtt';
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

/* ============== Store Perangkat ============== */
class DevicesStore {
  private devices = new Map<string, Device>();
  private listeners = new Set<Listener>();
  private ready = false;

  // MQTT (opsional)
  private mqttClient: any | null = null;
  private mqtt?: typeof import('mqtt/dist/mqtt.esm.js');

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
    const res = await fetch('/src/assets/mock/devices.json');
    const list: Device[] = await res.json();
    list.forEach((d) => this.devices.set(d.tagNumber, d));
  }

  private async connectMqtt() {
    // this.mqtt = await import('mqtt/dist/mqtt.esm.js');
    // this.mqttClient = this.mqtt.connect(MQTT_BROKER_URL, {
    //   clean: true,
    //   reconnectPeriod: 2000,
    // });
    // this.mqttClient.on('connect', () => {
    //   this.mqttClient.subscribe(`${TOPIC_PREFIX}/+/value`);
    //   this.mqttClient.subscribe(`${TOPIC_PREFIX}/+/state`);
    // });
    // this.mqttClient.on('message', (topic: string, payload: Uint8Array) => {
    //   try {
    //     const msg = new TextDecoder().decode(payload).trim();
    //     const parts = topic.split('/'); // taniverse devices <TAG> value/state
    //     const tag = parts[2];
    //     const leaf = parts[3];
    //     const dev = this.devices.get(tag);
    //     if (!dev) return;
    //     if (dev.type === 'sensor' && leaf === 'value') {
    //       dev.value = parseValue(msg);
    //     } else if (dev.type === 'actuator' && leaf === 'state') {
    //       dev.state = parseState(msg);
    //     }
    //     this.emit();
    //   } catch {
    //     /* ignore */
    //   }
    // });
  }

  // ===== API UI =====
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

    // Update optimistik
    d.state = next;
    this.emit();

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
