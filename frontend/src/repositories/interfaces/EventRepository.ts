// frontend/src/repositories/interface/EventRepository.ts

import { EventHistory } from '@models/event.model';

export interface EventRepository {
  getAll(): Promise<EventHistory[]>;
  getById(id: string): Promise<EventHistory | null>;
}
