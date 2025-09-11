// frontend/src/services/horti-batch.service.ts

import type { HortiBatch } from '@models/horti-batch.model';
import { getHortiBatchRepository } from '../repositories/repository-factory';

const repo = getHortiBatchRepository();

export const fetchAllHortiBatches = (): Promise<HortiBatch[]> => repo.getAll();

export const fetchHortiBatchById = (
  id: string
): Promise<HortiBatch | undefined> => repo.getById(id);

export const createHortiBatch = (batch: HortiBatch): Promise<void> =>
  repo.create(batch);

export const updateHortiBatch = (
  id: string,
  data: Partial<HortiBatch>
): Promise<void> => repo.update(id, data);

export const deleteHortiBatch = (id: string): Promise<void> => repo.delete(id);
