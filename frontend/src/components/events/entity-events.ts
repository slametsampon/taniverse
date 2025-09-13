// frontend/src/components/events/entity-events.ts

import { createEvent } from './event-logger';
import type { EventHistory } from '@models/event.model';

type EntityEventParams = {
  kind: string; // ayam | ikan | tanaman
  entityId: string;
  prevValue?: Record<string, any>;
  newValue?: Record<string, any>;
  triggeredBy?: string;
};

// CREATE
export function createEntityEvent(params: EntityEventParams): EventHistory {
  return createEvent({
    sourceType: 'user', // atau 'entity' kalau mau dibedakan
    sourceId: `${params.kind}:${params.entityId}`,
    eventType: 'create',
    field: 'all',
    prevValue: undefined,
    newValue: JSON.stringify(params.newValue),
    triggeredBy: params.triggeredBy ?? 'system',
    description: `Entitas baru dibuat: ${params.kind} ${params.entityId}`,
  });
}

// UPDATE (diff per field)
export function updateEntityEvents(params: EntityEventParams): EventHistory[] {
  const { kind, entityId, prevValue = {}, newValue = {}, triggeredBy } = params;
  const events: EventHistory[] = [];

  const skipFields = ['id', 'createdAt', 'updatedAt'];

  Object.keys(newValue).forEach((key) => {
    if (skipFields.includes(key)) return;

    let before = prevValue[key];
    let after = newValue[key];

    // normalisasi number
    const norm = (v: any) =>
      typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v))
        ? Number(v)
        : v;
    before = norm(before);
    after = norm(after);

    if (before !== after) {
      events.push(
        createEvent({
          sourceType: 'user',
          sourceId: `${kind}:${entityId}`,
          eventType: 'update',
          field: key,
          prevValue:
            typeof before === 'object' ? JSON.stringify(before) : before,
          newValue: typeof after === 'object' ? JSON.stringify(after) : after,
          triggeredBy: triggeredBy ?? 'system',
          description: `Entitas ${kind} field "${key}" berubah dari "${before}" → "${after}"`,
        })
      );
    }
  });

  return events;
}

// DELETE
export function deleteEntityEvent(params: EntityEventParams): EventHistory {
  return createEvent({
    sourceType: 'user',
    sourceId: `${params.kind}:${params.entityId}`,
    eventType: 'delete',
    field: 'all',
    prevValue: JSON.stringify(params.prevValue),
    newValue: undefined,
    triggeredBy: params.triggeredBy ?? 'system',
    description: `Entitas dihapus: ${params.kind} ${params.entityId}`,
  });
}
