// frontend/src/repositories/mock/MockPlantRepository.ts

import type { Plant } from '@models/plant.model';
import { fetchMockData } from 'src/services/mock-data.service';
import { PlantRepository } from '../interfaces/PlantRepository';

export class MockPlantRepository implements PlantRepository {
  private cache: Plant[] | null = null;

  async getAll(): Promise<Plant[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<Plant[]>('plants.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<Plant | null> {
    const all = await this.getAll();
    return all.find((p) => p.id === id) ?? null;
  }
}
