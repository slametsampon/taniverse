// frontend/src/services/plant.service.ts

import type { Plant } from '@models/plant.model';
import { getPlantRepository } from '../repositories/repository-factory';

const repo = getPlantRepository();

export const fetchAllPlants = (): Promise<Plant[]> => repo.getAll();
export const fetchPlantById = (id: string): Promise<Plant | null> =>
  repo.getById(id);
