// frontend/src/repositories/mock/MockHortiBatchRepository.ts

import { HortiBatchRepository } from '../interfaces/HortiBatchRepository';
import { PlantingBatch } from '@models/horti-batch.model';
import { fetchMockData } from '../../services/mock-data.service';

export class MockHortiBatchRepository implements HortiBatchRepository {
  private cache: PlantingBatch[] | null = null;

  async getAll(): Promise<PlantingBatch[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<PlantingBatch[]>('horti-batches.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<PlantingBatch | undefined> {
    const all = await this.getAll();
    return all.find((b) => b.id === id);
  }

  async create(batch: PlantingBatch): Promise<void> {
    const all = await this.getAll();
    all.push(batch);
  }

  async update(id: string, batch: Partial<PlantingBatch>): Promise<void> {
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
