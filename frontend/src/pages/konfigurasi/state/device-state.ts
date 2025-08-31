// frontend/src/pages/konfigurasi/state/device-state.ts

import type { DeviceConfig } from '@models/device.model';
import type { ValidationError } from 'src/services/devices-config.service';
import { validateDevice } from 'src/services/devices-config.service';
import type { TabId } from 'src/types/tab-id';

export type DeviceStateModel = DeviceConfig<any>;

export class DeviceStateHandler {
  static newTemplate(): DeviceStateModel {
    const now = new Date().toISOString();
    return {
      tagNumber: '',
      type: 'sensor',
      description: '',
      unit: '',
      ranges: { low: 0, high: 100 },
      alarms: { low: null, high: null },
      kind: null,
      allowedStates: null,
      defaultState: null,
      writable: false,
      io: { bus: 'adc', pin: null, address: null, channel: 0 },
      mqtt: { topic: '', readCmd: null, writeCmd: null },
      sample: { periodMs: 1000, deadband: 0 },
      display: { precision: 0 },
      location: { area: '', position: '' },
      meta: { createdAt: now, updatedAt: now },
    };
  }

  static patch(obj: any, path: string, value: any) {
    if (path === 'allowedStatesCsv') return;
    const keys = path.split('.');
    let ref = obj as any;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      ref[k] = { ...(ref[k] ?? {}) };
      ref = ref[k];
    }
    ref[keys[keys.length - 1]] = value;
  }

  static revalidate(device: DeviceStateModel, isNew: boolean) {
    const errs = validateDevice(device, isNew);
    const errMap: Record<string, string> = {};
    for (const e of errs) if (!errMap[e.field]) errMap[e.field] = e.message;
    return { errors: errs, errorsMap: errMap };
  }

  static fieldTab(path: string): TabId {
    if (path.startsWith('io.')) return 'hw-comm';
    if (path.startsWith('mqtt.')) return 'mqtt';
    if (path.startsWith('location.') || path.startsWith('meta.'))
      return 'loc-meta';
    return 'general';
  }

  static errorsByTab(
    errors: ValidationError[]
  ): Partial<Record<TabId, number>> {
    const by: Partial<Record<TabId, number>> = {
      general: 0,
      'hw-comm': 0,
      'loc-meta': 0,
    };
    for (const e of errors) {
      const tab = this.fieldTab(e.field);
      by[tab] = (by[tab] ?? 0) + 1;
    }
    return by;
  }
}
