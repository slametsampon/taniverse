// frontend/src/services/horti-harvest-result.service.ts

import type { HarvestResult } from '@models/harvest-result.model';
import { getHortiHarvestResultRepository } from '../repositories/repository-factory';

const repo = getHortiHarvestResultRepository();

export const fetchAllHortiHarvestResults = (): Promise<HarvestResult[]> =>
  repo.getAll();

export const fetchHortiHarvestResultById = (
  id: string
): Promise<HarvestResult | undefined> => repo.getById(id);

export const createHortiHarvestResult = (
  result: HarvestResult
): Promise<void> => repo.create(result);

export const updateHortiHarvestResult = (
  id: string,
  data: Partial<HarvestResult>
): Promise<void> => repo.update(id, data);

export const deleteHortiHarvestResult = (id: string): Promise<void> =>
  repo.delete(id);
