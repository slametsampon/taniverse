// frontend/src/services/livestock-harvest-result.service.ts

import type { HarvestResult } from '@models/harvest-result.model';
import { getLivestockHarvestResultRepository } from '../repositories/repository-factory';

const repo = getLivestockHarvestResultRepository();

export const fetchAllLivestockHarvestResults = (): Promise<HarvestResult[]> =>
  repo.getAll();

export const fetchLivestockHarvestResultById = (
  id: string
): Promise<HarvestResult | undefined> => repo.getById(id);

export const createLivestockHarvestResult = (
  result: HarvestResult
): Promise<void> => repo.create(result);

export const updateLivestockHarvestResult = (
  id: string,
  data: Partial<HarvestResult>
): Promise<void> => repo.update(id, data);

export const deleteLivestockHarvestResult = (id: string): Promise<void> =>
  repo.delete(id);
