// frontend/src/repositories/factory.ts

//import { USE_MOCK } from '../env';
import { EventRepository } from './interfaces/EventRepository';
import { MockEventRepository } from './mock/MockEventRepository';
import { ApiEventRepository } from './api/ApiEventRepository';

export function getEventRepository(): EventRepository {
  return true ? new MockEventRepository() : new ApiEventRepository();
}
