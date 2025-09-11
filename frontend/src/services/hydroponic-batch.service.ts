// frontend/src/services/hydroponic-batch.service.ts

import type { HydroponicBatch } from '@models/hidroponic-batch.model';
import { getHydroponicBatchRepository } from '../repositories/repository-factory';

const repo = getHydroponicBatchRepository();

export const fetchAllHydroponicBatches = (): Promise<HydroponicBatch[]> =>
  repo.getAll();

export const fetchHydroponicBatchById = (
  id: string
): Promise<HydroponicBatch | undefined> => repo.getById(id);

export const createHydroponicBatch = (batch: HydroponicBatch): Promise<void> =>
  repo.create(batch);

export const updateHydroponicBatch = (
  id: string,
  data: Partial<HydroponicBatch>
): Promise<void> => repo.update(id, data);

export const deleteHydroponicBatch = (id: string): Promise<void> =>
  repo.delete(id);
