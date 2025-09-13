// frontend/src/services/hydro-harvest-result.service.ts

import type { HarvestResult } from '@models/harvest-result.model';
import { getHydroHarvestResultRepository } from '../repositories/repository-factory';

const repo = getHydroHarvestResultRepository();

export const fetchAllHydroHarvestResults = (): Promise<HarvestResult[]> =>
  repo.getAll();

export const fetchHydroHarvestResultById = (
  id: string
): Promise<HarvestResult | undefined> => repo.getById(id);

export const createHydroHarvestResult = (
  result: HarvestResult
): Promise<void> => repo.create(result);

export const updateHydroHarvestResult = (
  id: string,
  data: Partial<HarvestResult>
): Promise<void> => repo.update(id, data);

export const deleteHydroHarvestResult = (id: string): Promise<void> =>
  repo.delete(id);
