// frontend/src/repositories/mock/MockAquaticSpeciesRepository.ts
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { AquaticSpeciesRepository } from '../interfaces/AquaticSpeciesRepository';

let cache: AquaticSpecies[] | null = null;

export class MockAquaticSpeciesRepository implements AquaticSpeciesRepository {
  async getAll(): Promise<AquaticSpecies[]> {
    const res = await fetch('./assets/mock/species.json');
    if (!res.ok) throw new Error('Gagal load species mock');
    return await res.json();
  }

  async getById(id: string): Promise<AquaticSpecies | null> {
    const all = await this.getAll();
    return all.find((s) => s.id === id) ?? null;
  }
}
