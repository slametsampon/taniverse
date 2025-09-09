// frontend/src/repositories/interfaces/AquaticSpeciesRepository.ts
import type { AquaticSpecies } from '@models/aquatic-species.model';

export interface AquaticSpeciesRepository {
  getAll(): Promise<AquaticSpecies[]>;
  getById(id: string): Promise<AquaticSpecies | null>;
}
