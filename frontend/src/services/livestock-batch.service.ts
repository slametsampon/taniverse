// frontend/src/services/livestock-batch.service.ts

import type { LivestockBatch } from '@models/livestock-batch.model';
import { getLivestockBatchRepository } from '../repositories/repository-factory';

const repo = getLivestockBatchRepository();

export const fetchAllLivestockBatches = (): Promise<LivestockBatch[]> =>
  repo.getAll();

export const fetchLivestockBatchById = (
  id: string
): Promise<LivestockBatch | undefined> => repo.getById(id);

export const createLivestockBatch = (batch: LivestockBatch): Promise<void> =>
  repo.create(batch);

export const updateLivestockBatch = (
  id: string,
  data: Partial<LivestockBatch>
): Promise<void> => repo.update(id, data);

export const deleteLivestockBatch = (id: string): Promise<void> =>
  repo.delete(id);
