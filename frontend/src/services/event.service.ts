// frontend/src/services/event.service.ts

import { EventHistory } from '@models/event.model';

export async function fetchMockEvents(): Promise<EventHistory[]> {
  const res = await fetch('/assets/mock/event.json');
  if (!res.ok) throw new Error('Failed to fetch mock event data');
  return await res.json();
}
