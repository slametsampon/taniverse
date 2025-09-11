// frontend/src/repositories/mock/MockHortiBatchRepository.ts

import { HortiBatchRepository } from '../interfaces/HortiBatchRepository';
import { HortiBatch } from '@models/horti-batch.model';
import { fetchMockData } from 'src/services/mock-data.service';

export class MockHortiBatchRepository implements HortiBatchRepository {
  private cache: HortiBatch[] | null = null;

  async getAll(): Promise<HortiBatch[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<HortiBatch[]>('horti-batches.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<HortiBatch | undefined> {
    const all = await this.getAll();
    return all.find((b) => b.id === id);
  }

  async create(batch: HortiBatch): Promise<void> {
    const all = await this.getAll();
    all.push(batch);
  }

  async update(id: string, batch: Partial<HortiBatch>): Promise<void> {
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
