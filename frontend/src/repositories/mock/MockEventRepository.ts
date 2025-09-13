// frontend/src/repositories/mock/MockEventRepository.ts

import { fetchMockData } from 'src/services/mock-data.service';
import { EventRepository } from '../interfaces/EventRepository';
import { EventHistory } from '@models/event.model';
import { getBufferedEvents } from 'src/services/event-buffer.service';

export class MockEventRepository implements EventRepository {
  async getAll() {
    const base = await fetchMockData<EventHistory[]>('event.json');
    const dynamic = getBufferedEvents();
    return [...dynamic, ...base];
  }

  async getById(id: string) {
    const all = await this.getAll();
    return all.find((e) => e.id === id) ?? null;
  }
}
