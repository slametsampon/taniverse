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

import { MockAquaticSpeciesRepository } from './mock/MockAquaticSpeciesRepository';
import type { AquaticSpeciesRepository } from './interfaces/AquaticSpeciesRepository';
import { ApiAquaticSpeciesRepository } from './api/ApiAquaticSpeciesRepository';

import type { LivestockRepository } from './interfaces/LivestockRepository';
import { MockLivestockRepository } from './mock/MockLivestockRepository';
import { ApiLivestockRepository } from './api/ApiLivestockRepository';

export function getDeviceRepository(): DeviceRepository {
  return isMockMode() ? new MockDeviceRepository() : new ApiDeviceRepository();
}

export function getPlantRepository(): PlantRepository {
  return isMockMode() ? new MockPlantRepository() : new ApiPlantRepository();
}

export function getEventRepository(): EventRepository {
  return isMockMode() ? new MockEventRepository() : new ApiEventRepository();
}

export function getAquaticSpeciesRepository(): AquaticSpeciesRepository {
  // Ganti logic ini jika kelak pakai API/SQLite
  return isMockMode()
    ? new MockAquaticSpeciesRepository()
    : new ApiAquaticSpeciesRepository();
}

export function getLivestockRepository(): LivestockRepository {
  return isMockMode()
    ? new MockLivestockRepository()
    : new ApiLivestockRepository();
}
