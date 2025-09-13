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

import { AquaticBatchRepository } from './interfaces/AquaticBatchRepository';
import { MockAquaticBatchRepository } from './mock/MockAquaticBatchRepository';
import { ApiAquaticBatchRepository } from './api/ApiAquaticBatchRepository';

import { LivestockBatchRepository } from './interfaces/LivestockBatchRepository';
import { MockLivestockBatchRepository } from './mock/MockLivestockBatchRepository';
import { ApiLivestockBatchRepository } from './api/ApiLivestockBatchRepository';

import { HortiBatchRepository } from './interfaces/HortiBatchRepository';
import { MockHortiBatchRepository } from './mock/MockHortiBatchRepository';
import { ApiHortiBatchRepository } from './api/ApiHortiBatchRepository';

import { HydroponicBatchRepository } from './interfaces/HydroponicBatchRepository';
import { MockHydroponicBatchRepository } from './mock/MockHydroponicBatchRepository';
import { ApiHydroponicBatchRepository } from './api/ApiHydroponicBatchRepository';

import { ApiUserRepository } from './api/ApiUserRepository';
import { UserRepository } from './interfaces/UserRepository';
import { MockUserRepository } from './mock/MockUserRepository';

import { HarvestResultRepository } from './interfaces/HarvestResultRepository';
import { MockHydroHarvestResultRepository } from './mock/MockHydroHarvestResultRepository';
import { ApiHydroHarvestResultRepository } from './api/ApiHydroHarvestResultRepository';

import { MockHortiHarvestResultRepository } from './mock/MockHortiHarvestResultRepository';
import { ApiHortiHarvestResultRepository } from './api/ApiHortiHarvestResultRepository';

import { MockAquaHarvestResultRepository } from './mock/MockAquaHarvestResultRepository';
import { ApiAquaHarvestResultRepository } from './api/ApiAquaHarvestResultRepository';

import { MockLivestockHarvestResultRepository } from './mock/MockLivestockHarvestResultRepository';
import { ApiLivestockHarvestResultRepository } from './api/ApiLivestockHarvestResultRepository';

export function getUserRepository(): UserRepository {
  return isMockMode() ? new MockUserRepository() : new ApiUserRepository();
}

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

export function getAquaticBatchRepository(): AquaticBatchRepository {
  return isMockMode()
    ? new MockAquaticBatchRepository()
    : new ApiAquaticBatchRepository();
}

export function getLivestockBatchRepository(): LivestockBatchRepository {
  return isMockMode()
    ? new MockLivestockBatchRepository()
    : new ApiLivestockBatchRepository();
}

export function getHortiBatchRepository(): HortiBatchRepository {
  return isMockMode()
    ? new MockHortiBatchRepository()
    : new ApiHortiBatchRepository();
}

export function getHydroponicBatchRepository(): HydroponicBatchRepository {
  return isMockMode()
    ? new MockHydroponicBatchRepository()
    : new ApiHydroponicBatchRepository();
}

export function getHortiHarvestResultRepository(): HarvestResultRepository {
  return isMockMode()
    ? new MockHortiHarvestResultRepository()
    : new ApiHortiHarvestResultRepository();
}

export function getAquaHarvestResultRepository(): HarvestResultRepository {
  return isMockMode()
    ? new MockAquaHarvestResultRepository()
    : new ApiAquaHarvestResultRepository();
}

export function getLivestockHarvestResultRepository(): HarvestResultRepository {
  return isMockMode()
    ? new MockLivestockHarvestResultRepository()
    : new ApiLivestockHarvestResultRepository();
}

export function getHydroHarvestResultRepository(): HarvestResultRepository {
  return isMockMode()
    ? new MockHydroHarvestResultRepository()
    : new ApiHydroHarvestResultRepository();
}
