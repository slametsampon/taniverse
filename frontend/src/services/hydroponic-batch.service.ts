// frontend/src/services/hydroponic-batch.service.ts

import { HydroponicBatchRepository } from '../repositories/interfaces/HydroponicBatchRepository';
import { HydroponicBatch } from '@models/hydroponic-batch.model';

export class HydroponicBatchService {
  constructor(private repository: HydroponicBatchRepository) {}

  async getAllBatches(): Promise<HydroponicBatch[]> {
    return this.repository.getAll();
  }

  async getBatchById(id: string): Promise<HydroponicBatch | undefined> {
    return this.repository.getById(id);
  }

  async createBatch(batch: HydroponicBatch): Promise<void> {
    return this.repository.create(batch);
  }

  async updateBatch(id: string, data: Partial<HydroponicBatch>): Promise<void> {
    return this.repository.update(id, data);
  }

  async deleteBatch(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
