// frontend/src/services/aquatic-batch.service.ts

import type { AquaticBatch } from '@models/aquatic-batch.model';
import { getAquaticBatchRepository } from '../repositories/repository-factory';

const repo = getAquaticBatchRepository();

export const fetchAllAquaticBatches = (): Promise<AquaticBatch[]> =>
  repo.getAll();

export const fetchAquaticBatchById = (
  id: string
): Promise<AquaticBatch | undefined> => repo.getById(id);

export const createAquaticBatch = (batch: AquaticBatch): Promise<void> =>
  repo.create(batch);

export const updateAquaticBatch = (
  id: string,
  data: Partial<AquaticBatch>
): Promise<void> => repo.update(id, data);

export const deleteAquaticBatch = (id: string): Promise<void> =>
  repo.delete(id);
