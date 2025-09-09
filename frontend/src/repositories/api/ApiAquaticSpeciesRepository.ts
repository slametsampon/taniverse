// frontend/src/repositories/api/ApiAquaticSpeciesRepository.ts
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { AquaticSpeciesRepository } from '../interfaces/AquaticSpeciesRepository';

export class ApiAquaticSpeciesRepository implements AquaticSpeciesRepository {
  async getAll(): Promise<AquaticSpecies[]> {
    const res = await fetch('/api/aquatic-species');
    if (!res.ok) throw new Error('Failed to fetch aquatic species');
    return await res.json();
  }

  async getById(id: string): Promise<AquaticSpecies | null> {
    const all = await this.getAll();
    return all.find((s) => s.id === id) ?? null;
  }
}
