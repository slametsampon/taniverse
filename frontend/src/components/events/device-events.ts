// frontend/src/components/events/device-events.ts

import type { EventHistory } from '@models/event.model';
import { createEvent } from './event-logger';

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
