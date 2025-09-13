// frontend/src/services/event-buffer.service.ts

import type { EventHistory } from '@models/event.model';

const buffer: EventHistory[] = [];

export function pushEvent(e: EventHistory) {
  buffer.unshift(e); // terbaru di atas
  if (buffer.length > 50) buffer.pop(); // batas max
}

export function getBufferedEvents(): EventHistory[] {
  return [...buffer];
}
