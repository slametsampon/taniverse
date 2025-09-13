// frontend/src/components/events/device-events.ts

import { createEvent } from './event-logger';
import type { EventHistory } from '@models/event.model';

type DeviceEventParams = {
  deviceId: string;
  prevValue?: Record<string, any>;
  newValue?: Record<string, any>;
  triggeredBy?: string;
};

export function checkDeviceAlarm(
  sourceId: string,
  field: string,
  newValue: number,
  threshold: { min: number; max: number },
  prevValue: number
): EventHistory | null {
  if (newValue < threshold.min || newValue > threshold.max) {
    return createEvent({
      sourceType: 'device',
      sourceId,
      eventType: 'alarm',
      field,
      prevValue,
      newValue,
      triggeredBy: 'system',
      description: `ALARM: ${newValue.toFixed(1)} is outside threshold [${
        threshold.min
      } - ${threshold.max}]`,
    });
  }
  return null;
}

// === CREATE ===
export function createDeviceEvent(params: DeviceEventParams): EventHistory {
  return createEvent({
    sourceType: 'device',
    sourceId: params.deviceId,
    eventType: 'create',
    field: 'all',
    prevValue: undefined,
    newValue: JSON.stringify(params.newValue),
    triggeredBy: params.triggeredBy ?? 'system',
    description: `Perangkat baru dibuat: ${params.deviceId}`,
  });
}

// === UPDATE (precise diff) ===
export function updateDeviceEvents(params: DeviceEventParams): EventHistory[] {
  const { deviceId, prevValue = {}, newValue = {}, triggeredBy } = params;
  const events: EventHistory[] = [];

  const skipFields = ['meta', 'status'];

  Object.keys(newValue).forEach((key) => {
    if (skipFields.includes(key)) {
      console.log(`⏭️ Skip field: ${key}`);
      return;
    }

    let before = prevValue[key];
    let after = newValue[key];

    // Normalisasi number
    const norm = (v: any) =>
      typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v))
        ? Number(v)
        : v;

    before = norm(before);
    after = norm(after);

    console.log(`🔍 Field=${key}`, 'Before=', before, 'After=', after);

    if (before !== after) {
      console.log(`✅ Changed: ${key}`);

      const safeBefore =
        typeof before === 'object' ? JSON.stringify(before) : before;
      const safeAfter =
        typeof after === 'object' ? JSON.stringify(after) : after;

      events.push(
        createEvent({
          sourceType: 'device',
          sourceId: deviceId,
          eventType: 'update',
          field: key,
          prevValue: safeBefore,
          newValue: safeAfter,
          triggeredBy: triggeredBy ?? 'system',
          description: `Field "${key}" berubah dari "${safeBefore}" → "${safeAfter}"`,
        })
      );
    }
  });

  console.log('Generated Events:', events);
  console.groupEnd();

  return events;
}

// === DELETE ===
export function deleteDeviceEvent(params: DeviceEventParams): EventHistory {
  return createEvent({
    sourceType: 'device',
    sourceId: params.deviceId,
    eventType: 'delete',
    field: 'all',
    prevValue: JSON.stringify(params.prevValue),
    newValue: undefined,
    triggeredBy: params.triggeredBy ?? 'system',
    description: `Perangkat dihapus: ${params.deviceId}`,
  });
}
