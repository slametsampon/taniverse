// frontend/src/components/events/event-logger.ts

import type { EventHistory } from '@models/event.model';
import { v4 as uuidv4 } from 'uuid'; // gunakan atau ganti sesuai kebutuhan

export function createEvent(
  event: Omit<EventHistory, 'id' | 'timestamp'>
): EventHistory {
  return {
    ...event,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  };
}
