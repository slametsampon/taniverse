// frontend/src/services/aquatic-batch.service.ts

import { AquaticBatchRepository } from '../repositories/interfaces/AquaticBatchRepository';
import { AquaticBatch } from '@models/aquatic-batch.model';

export class AquaticBatchService {
  constructor(private repository: AquaticBatchRepository) {}

  async getAllBatches(): Promise<AquaticBatch[]> {
    return this.repository.getAll();
  }

  async getBatchById(id: string): Promise<AquaticBatch | undefined> {
    return this.repository.getById(id);
  }

  async createBatch(batch: AquaticBatch): Promise<void> {
    return this.repository.create(batch);
  }

  async updateBatch(id: string, data: Partial<AquaticBatch>): Promise<void> {
    return this.repository.update(id, data);
  }

  async deleteBatch(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
