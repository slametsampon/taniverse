// frontend/src/services/aquatic-species.service.ts
import type { AquaticSpecies } from '@models/aquatic-species.model';
import { getAquaticSpeciesRepository } from 'src/repositories/repository-factory';

const repo = getAquaticSpeciesRepository();

export const fetchAllAquaticSpecies = (): Promise<AquaticSpecies[]> =>
  repo.getAll();
export const fetchAquaticSpeciesById = (
  id: string
): Promise<AquaticSpecies | null> => repo.getById(id);
