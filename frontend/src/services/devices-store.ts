// frontend/src/services/devices-store.ts

import { mqttService, TOPIC_PREFIX } from './mqtt-service';
import { getMode, isMockMode, isSimMode, isMqttMode } from './mode';
import { getDeviceRepository } from '../repositories/repository-factory';
import type { DeviceRepository } from '../repositories/interfaces/DeviceRepository';
import type { DeviceModel, DeviceStatus } from '@models/device.model';
import { checkDeviceAlarm } from 'src/components/events/device-events';
import { pushEvent } from 'src/services/event-buffer.service';
import { createEvent } from 'src/components/events/event-logger';
// Tambahkan ini di awal file:

type Device = DeviceModel & {
  status?: DeviceStatus;
};

type Listener = () => void;

/* ============== Store Perangkat ============== */
class DevicesStore {
  private devices = new Map<string, Device>();
  private listeners = new Set<Listener>();
  private ready = false;
  private mqttClient: any | null = null;
  private simulationInterval?: number;
  private repo: DeviceRepository = getDeviceRepository();
  private lastStatus = new Map<string, DeviceStatus['valueStatus']>();
  private lastValues = new Map<string, number>();
  private lastMode: string | null = null;

  // ===== INIT =====
  async init(force = false) {
    if (this.ready && !force) return;

    this.devices.clear();
    this.stopSimulation();

    const mode = getMode();

    // 🆕 generate event jika mode berubah
    if (this.lastMode && this.lastMode !== mode) {
      const ev = createEvent({
        sourceType: 'device',
        sourceId: 'DevicesStore',
        eventType: 'connection',
        field: 'mode',
        prevValue: this.lastMode,
        newValue: mode,
        triggeredBy: 'system',
        description: `Perpindahan mode: ${this.lastMode.toUpperCase()} → ${mode.toUpperCase()}`,
      });
      pushEvent(ev);
    }
    this.lastMode = mode; // update baseline

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
          const low = dev.alarms_low ?? dev.ranges_low;
          const high = dev.alarms_high ?? dev.ranges_high;
          const mid = (low + high) / 2;
          const deviation = 0.165 * mid;
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
    const now = new Date().toISOString();

    if (dev.type === 'sensor') {
      const val = dev.value;
      const lo = dev.alarms_low ?? null;
      const hi = dev.alarms_high ?? null;

      const valueStatus: DeviceStatus['valueStatus'] =
        val === null || val === undefined
          ? 'sensor-fail'
          : lo !== null && val < lo
          ? 'low-alarm'
          : hi !== null && val > hi
          ? 'high-alarm'
          : 'normal';

      dev.status = {
        mqtt: this.mqttClient ? 'connected' : 'disconnected',
        valueStatus,
        lastSeen: now,
      };
    } else if (dev.type === 'actuator') {
      dev.status = {
        mqtt: this.mqttClient ? 'connected' : 'disconnected',
        valueStatus: dev.state ? 'normal' : 'sensor-fail',
        lastSeen: now,
      };
    } else {
      dev.status = {
        mqtt: 'disconnected',
        valueStatus: 'sensor-fail',
        lastSeen: now,
      };
    }

    const prevVal = this.lastValues.get(dev.tagNumber) ?? dev.value ?? 0;
    const currVal = dev.value ?? 0;
    const prevStatus = this.lastStatus.get(dev.tagNumber);
    const currStatus = dev.status?.valueStatus;

    if (currStatus === 'low-alarm' || currStatus === 'high-alarm') {
      if (prevStatus !== currStatus) {
        const alarmEvent = checkDeviceAlarm(
          dev.tagNumber,
          'sensor',
          currVal,
          {
            min: dev.alarms_low ?? dev.ranges_low ?? 0,
            max: dev.alarms_high ?? dev.ranges_high ?? 100,
          },
          prevVal // ✅ nilai lama, bukan current
        );

        if (alarmEvent) {
          pushEvent(alarmEvent);
          console.warn('[Event] 🔔 Alarm generated:', alarmEvent);
        }
      }
    }

    // Update cache
    this.lastStatus.set(dev.tagNumber, currStatus);
    this.lastValues.set(dev.tagNumber, currVal);
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

  getStatus(
    tag: string
  ):
    | DeviceStatus
    | { mqtt: 'disconnected'; valueStatus: 'sensor-fail'; lastSeen?: string } {
    return (
      this.devices.get(tag)?.status ?? {
        mqtt: 'disconnected',
        valueStatus: 'sensor-fail',
        lastSeen: undefined,
      }
    );
  }

  getMode() {
    return isMockMode() ? 'mock' : 'mqtt';
  }

  getSensorValue(tag: string): number | null {
    const dev = this.devices.get(tag);
    return dev?.type === 'sensor' ? dev.value ?? null : null;
  }

  getActuatorState(tag: string): 'ON' | 'OFF' {
    const dev = this.devices.get(tag);
    return dev?.type === 'actuator' &&
      (dev.state === 'ON' || dev.state === 'OFF')
      ? dev.state
      : 'OFF';
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
