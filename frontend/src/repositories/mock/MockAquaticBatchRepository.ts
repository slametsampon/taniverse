// frontend/src/repositories/mock/MockAquaticBatchRepository.ts

import { AquaticBatchRepository } from '../interfaces/AquaticBatchRepository';
import { AquaticBatch } from '@models/aquatic-batch.model';
import { fetchMockData } from 'src/services/mock-data.service';

export class MockAquaticBatchRepository implements AquaticBatchRepository {
  private cache: AquaticBatch[] | null = null;

  async getAll(): Promise<AquaticBatch[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<AquaticBatch[]>('aquatic-batches.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<AquaticBatch | undefined> {
    const all = await this.getAll();
    return all.find((batch) => batch.id === id);
  }

  async create(batch: AquaticBatch): Promise<void> {
    const all = await this.getAll();
    all.push(batch);
  }

  async update(id: string, batch: Partial<AquaticBatch>): Promise<void> {
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
