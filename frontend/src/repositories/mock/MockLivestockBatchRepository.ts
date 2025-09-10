// frontend/src/repositories/mock/MockLivestockBatchRepository.ts

import { LivestockBatchRepository } from '../interfaces/LivestockBatchRepository';
import { LivestockBatch } from '../../models/livestock-batch.model';
import { fetchMockData } from '../../services/mock-data.service';

export class MockLivestockBatchRepository implements LivestockBatchRepository {
  private cache: LivestockBatch[] | null = null;

  async getAll(): Promise<LivestockBatch[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<LivestockBatch[]>(
        'livestock-batches.json'
      );
    }
    return this.cache!;
  }

  async getById(id: string): Promise<LivestockBatch | undefined> {
    const all = await this.getAll();
    return all.find((b) => b.id === id);
  }

  async create(batch: LivestockBatch): Promise<void> {
    const all = await this.getAll();
    all.push(batch);
  }

  async update(id: string, batch: Partial<LivestockBatch>): Promise<void> {
    const all = await this.getAll();
    const index = all.findIndex((b) => b.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...batch };
    }
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    this.cache = all.filter((b) => b.id !== id);
  }
}
