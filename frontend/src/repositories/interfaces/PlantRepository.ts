// frontend/src/repositories/interfaces/PlantRepository.ts

import type { Plant } from '@models/plant.model';

export interface PlantRepository {
  getAll(): Promise<Plant[]>;
  getById(id: string): Promise<Plant | null>;
}
