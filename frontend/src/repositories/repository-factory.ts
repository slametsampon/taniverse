// frontend/src/repositories/repository-factory.ts

import { isMockMode } from '../services/mode';
import { DeviceRepository } from './interfaces/DeviceRepository';
import { MockDeviceRepository } from './mock/MockDeviceRepository';
import { ApiDeviceRepository } from './api/ApiDeviceRepository';

import type { PlantRepository } from './interfaces/PlantRepository';
import { MockPlantRepository } from './mock/MockPlantRepository';
import { ApiPlantRepository } from './api/ApiPlantRepository';

import { EventRepository } from './interfaces/EventRepository';
import { MockEventRepository } from './mock/MockEventRepository';
import { ApiEventRepository } from './api/ApiEventRepository';

export function getDeviceRepository(): DeviceRepository {
  return isMockMode() ? new MockDeviceRepository() : new ApiDeviceRepository();
}

export function getPlantRepository(): PlantRepository {
  return isMockMode() ? new MockPlantRepository() : new ApiPlantRepository();
}

export function getEventRepository(): EventRepository {
  return true ? new MockEventRepository() : new ApiEventRepository();
}
