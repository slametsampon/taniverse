// frontend/src/repositories/interfaces/LivestockBatchRepository.ts

import { LivestockBatch } from '@models/livestock-batch.model';

export interface LivestockBatchRepository {
  getAll(): Promise<LivestockBatch[]>;
  getById(id: string): Promise<LivestockBatch | undefined>;
  create(batch: LivestockBatch): Promise<void>;
  update(id: string, batch: Partial<LivestockBatch>): Promise<void>;
  delete(id: string): Promise<void>;
}
