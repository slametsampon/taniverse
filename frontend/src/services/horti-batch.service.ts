// frontend/src/services/horti-batch.service.ts

import { HortiBatchRepository } from '../repositories/interfaces/HortiBatchRepository';
import { HortiBatch } from '@models/horti-batch.model';

export class HortiBatchService {
  constructor(private repository: HortiBatchRepository) {}

  async getAllBatches(): Promise<HortiBatch[]> {
    return this.repository.getAll();
  }

  async getBatchById(id: string): Promise<HortiBatch | undefined> {
    return this.repository.getById(id);
  }

  async createBatch(batch: HortiBatch): Promise<void> {
    return this.repository.create(batch);
  }

  async updateBatch(id: string, data: Partial<HortiBatch>): Promise<void> {
    return this.repository.update(id, data);
  }

  async deleteBatch(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
