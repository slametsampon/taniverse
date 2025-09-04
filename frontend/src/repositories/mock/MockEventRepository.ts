// frontend/src/repositories/mock/MockEventRepository.ts

import { fetchMockData } from '../../services/mock-data.service';
import { EventRepository } from '../interfaces/EventRepository';
import { EventHistory } from '@models/event.model';

export class MockEventRepository implements EventRepository {
  async getAll() {
    return await fetchMockData<EventHistory[]>('event.json');
  }

  async getById(id: string) {
    const all = await this.getAll();
    return all.find((e) => e.id === id) ?? null;
  }
}
