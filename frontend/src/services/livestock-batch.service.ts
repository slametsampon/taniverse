// frontend/src/services/livestock-batch.service.ts

import { LivestockBatchRepository } from '../repositories/interfaces/LivestockBatchRepository';
import { LivestockBatch } from '@models/livestock-batch.model';

export class LivestockBatchService {
  constructor(private repository: LivestockBatchRepository) {}

  async getAllBatches(): Promise<LivestockBatch[]> {
    return this.repository.getAll();
  }

  async getBatchById(id: string): Promise<LivestockBatch | undefined> {
    return this.repository.getById(id);
  }

  async createBatch(batch: LivestockBatch): Promise<void> {
    return this.repository.create(batch);
  }

  async updateBatch(id: string, data: Partial<LivestockBatch>): Promise<void> {
    return this.repository.update(id, data);
  }

  async deleteBatch(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
