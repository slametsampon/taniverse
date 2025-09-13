// frontend/src/services/aqua-harvest-result.service.ts

import type { HarvestResult } from '@models/harvest-result.model';
import { getAquaHarvestResultRepository } from '../repositories/repository-factory';

const repo = getAquaHarvestResultRepository();

export const fetchAllAquaHarvestResults = (): Promise<HarvestResult[]> =>
  repo.getAll();

export const fetchAquaHarvestResultById = (
  id: string
): Promise<HarvestResult | undefined> => repo.getById(id);

export const createAquaHarvestResult = (result: HarvestResult): Promise<void> =>
  repo.create(result);

export const updateAquaHarvestResult = (
  id: string,
  data: Partial<HarvestResult>
): Promise<void> => repo.update(id, data);

export const deleteAquaHarvestResult = (id: string): Promise<void> =>
  repo.delete(id);
