// frontend/src/repositories/api/ApiEventRepository.ts

import { EventRepository } from '../interfaces/EventRepository';

export class ApiEventRepository implements EventRepository {
  async getAll() {
    const res = await fetch('/api/events');
    if (!res.ok) throw new Error('API fetch failed');
    return await res.json();
  }

  async getById(id: string) {
    const res = await fetch(`/api/events/${id}`);
    if (!res.ok) throw new Error('Event not found');
    return await res.json();
  }
}
