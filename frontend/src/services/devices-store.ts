// frontend/src/services/devices-service.ts

import { mqttService, TOPIC_PREFIX } from './mqtt-service';
import { getMode, isMockMode, isSimMode, isMqttMode } from './mode';
import { getDeviceRepository } from '../repositories/repository-factory';
import type { DeviceRepository } from '../repositories/interfaces/DeviceRepository';
import type { DeviceConfig } from '@models/device.model';

type Device = DeviceConfig & {
  status?: DeviceStatus;
};

type DeviceStatus =
  | 'ok'
  | 'alarm-low'
  | 'alarm-high'
  | 'disconnected'
  | 'unknown';

type Listener = () => void;

/* ============== Store Perangkat ============== */
class DevicesStore {
  private devices = new Map<string, Device>();
  private listeners = new Set<Listener>();
  private ready = false;
  private mqttClient: any | null = null;
  private simulationInterval?: number;
  private repo: DeviceRepository = getDeviceRepository();

  // ===== INIT =====
  async init(force = false) {
    if (this.ready && !force) return;

    this.devices.clear();
    this.stopSimulation();

    const mode = getMode();

    await this.loadFromRepository();

    if (mode === 'mqtt') {
      await this.connectMqtt();
    } else if (mode === 'sim') {
      this.startSimulation();
    }

    this.ready = true;
    this.emit();
  }

  // ===== Load Data dari Repository (Mock/API/MQTT) =====
  private async loadFromRepository() {
    try {
      const list = await this.repo.getAll();
      list.forEach((d) => {
        this.updateStatus(d);
        this.devices.set(d.tagNumber, d);
      });
    } catch (err) {
      console.error('[devicesStore] ❌ Gagal load data:', err);
    }
  }

  // ===== MQTT =====
  private async connectMqtt() {
    if (isMockMode()) return;

    await mqttService.connect();

    mqttService.onMessage((topic, rawPayload) => {
      try {
        const msg = rawPayload.trim();
        const parts = topic.split('/');
        const tag = parts[2];
        const leaf = parts[3];
        const dev = this.devices.get(tag);
        if (!dev) return;

        if (dev.type === 'sensor' && leaf === 'value') {
          dev.value = parseValue(msg);
        } else if (dev.type === 'actuator' && leaf === 'state') {
          dev.state = parseState(msg);
        }

        this.updateStatus(dev);
        this.emit();
      } catch (err) {
        console.error('[devicesStore] ❌ Error parsing MQTT message:', err);
      }
    });
  }

  // ===== Simulasi (Sensor Random Value) =====
  private startSimulation() {
    this.simulationInterval && clearInterval(this.simulationInterval);

    this.simulationInterval = window.setInterval(() => {
      this.devices.forEach((dev) => {
        if (dev.type === 'sensor') {
          const low = dev.ranges?.low ?? 20;
          const high = dev.ranges?.high ?? 100;
          const mid = (low + high) / 2;
          const deviation = 0.05 * mid;
          const r = Math.random() * 2 - 1;
          const simulated = mid + r * deviation;

          dev.value = Number(simulated.toFixed(2));
          this.updateStatus(dev);
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

  // ===== Status Logic =====
  private updateStatus(dev: Device) {
    if (dev.type === 'sensor') {
      if (dev.value === null || dev.value === undefined) {
        dev.status = 'disconnected';
        return;
      }

      const val = dev.value;
      const lo = dev.alarms?.low ?? null;
      const hi = dev.alarms?.high ?? null;

      if (lo !== null && val < lo) {
        dev.status = 'alarm-low';
      } else if (hi !== null && val > hi) {
        dev.status = 'alarm-high';
      } else {
        dev.status = 'ok';
      }
    } else if (dev.type === 'actuator') {
      dev.status = dev.state ? 'ok' : 'disconnected';
    } else {
      dev.status = 'unknown';
    }
  }

  // ===== Public API =====
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
      this.updateStatus(d);
      this.emit();
    }
  }

  getMode() {
    return isMockMode() ? 'mock' : 'mqtt';
  }
}

/* ============== Payload Parsers ============== */
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
export type { Device };
