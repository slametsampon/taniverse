// frontend/src/components/events/batch-events.ts

import { createEvent } from './event-logger';
import type { EventHistory } from '@models/event.model';

type BatchEventParams = {
  batchId: string;
  prevValue?: Record<string, any>;
  newValue?: Record<string, any>;
  triggeredBy?: string;
};

// === CREATE ===
export function createBatchEvent(params: BatchEventParams): EventHistory {
  return createEvent({
    sourceType: 'batch',
    sourceId: params.batchId,
    eventType: 'create',
    field: 'all',
    prevValue: undefined,
    newValue: JSON.stringify(params.newValue),
    triggeredBy: params.triggeredBy ?? 'system',
    description: `Batch baru dibuat: ${params.batchId}`,
  });
}

// === UPDATE (precise per field) ===
export function updateBatchEvents(params: BatchEventParams): EventHistory[] {
  const { batchId, prevValue = {}, newValue = {}, triggeredBy } = params;
  const events: EventHistory[] = [];

  Object.keys(newValue).forEach((key) => {
    const before = prevValue[key];
    const after = newValue[key];

    if (before !== after) {
      events.push(
        createEvent({
          sourceType: 'batch',
          sourceId: batchId,
          eventType: 'update',
          field: key,
          prevValue: before,
          newValue: after,
          triggeredBy: triggeredBy ?? 'system',
          description: `Field "${key}" berubah dari "${before}" → "${after}"`,
        })
      );
    }
  });

  return events;
}

// === DELETE ===
export function deleteBatchEvent(params: BatchEventParams): EventHistory {
  return createEvent({
    sourceType: 'batch',
    sourceId: params.batchId,
    eventType: 'delete',
    field: 'all',
    prevValue: JSON.stringify(params.prevValue),
    newValue: undefined,
    triggeredBy: params.triggeredBy ?? 'system',
    description: `Batch dihapus: ${params.batchId}`,
  });
}
