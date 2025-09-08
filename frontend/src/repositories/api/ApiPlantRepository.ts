// frontend/src/repositories/api/ApiPlantRepository.ts

import type { Plant } from '@models/plant.model';
import { PlantRepository } from '../interfaces/PlantRepository';

export class ApiPlantRepository implements PlantRepository {
  private baseUrl = '/api/plants';

  async getAll(): Promise<Plant[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error(`[ApiPlantRepository] Failed to fetch list`);
    return await res.json();
  }

  async getById(id: string): Promise<Plant | null> {
    const res = await fetch(`${this.baseUrl}/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    return await res.json();
  }
}
