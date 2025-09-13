// frontend/src/services/event-buffer.service.ts

import type { EventHistory } from '@models/event.model';

const buffer: EventHistory[] = [];
const listeners = new Set<(e: EventHistory) => void>();

export function pushEvent(e: EventHistory) {
  buffer.unshift(e);
  if (buffer.length > 1000) buffer.pop();

  // 🔔 Notify all listeners
  listeners.forEach((cb) => cb(e));
}

export function getBufferedEvents(): EventHistory[] {
  return [...buffer];
}

// Subscribe / unsubscribe
export function onEvent(cb: (e: EventHistory) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb); // return unsubscribe
}
