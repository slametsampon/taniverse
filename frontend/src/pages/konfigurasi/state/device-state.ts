// frontend/src/pages/konfigurasi/state/device-state.ts

import type { DeviceModel } from '@models/device.model';
import type { ValidationError } from 'src/services/devices-config.service';
import { validateDevice } from 'src/services/devices-config.service';
import type { TabId } from 'src/types/tab-id';

export type DeviceStateModel = DeviceModel;

export class DeviceStateHandler {
  static newTemplate(): DeviceStateModel {
    const now = new Date().toISOString();
    return {
      tagNumber: '',
      type: 'sensor',
      description: '',
      unit: '',
      ranges_low: 0,
      ranges_high: 100,
      alarms_low: null,
      alarms_high: null,
      writable: false,
      allowedStates: [],
      defaultState: '',
      io_bus: 'adc',
      io_pin: null,
      io_address: null,
      io_channel: 0,
      sample_periodMs: 1000,
      sample_deadband: 0,
      display_precision: 0,
      location: '',
      value: undefined,
      state: undefined,
      status: undefined,
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
    if (path.startsWith('io_')) return 'hw-comm';
    if (path.startsWith('mqtt.')) return 'mqtt'; // jika tetap ada field nested mqtt
    if (path.startsWith('location') || path.startsWith('meta'))
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
