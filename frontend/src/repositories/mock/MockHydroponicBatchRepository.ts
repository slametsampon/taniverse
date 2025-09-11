// frontend/src/repositories/mock/MockHydroponicBatchRepository.ts

import { HydroponicBatchRepository } from '../interfaces/HydroponicBatchRepository';
import { HydroponicBatch } from '@models/hydroponic-batch.model';
import { fetchMockData } from 'src/services/mock-data.service';

export class MockHydroponicBatchRepository
  implements HydroponicBatchRepository
{
  private cache: HydroponicBatch[] | null = null;

  async getAll(): Promise<HydroponicBatch[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<HydroponicBatch[]>('hydro-batches.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<HydroponicBatch | undefined> {
    const all = await this.getAll();
    return all.find((b) => b.id === id);
  }

  async create(batch: HydroponicBatch): Promise<void> {
    const all = await this.getAll();
    all.push(batch);
  }

  async update(id: string, batch: Partial<HydroponicBatch>): Promise<void> {
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
