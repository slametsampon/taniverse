// frontend/src/repositories/mock/MockHortiHarvestResultRepository.ts

import { HarvestResultRepository } from '../interfaces/HarvestResultRepository';
import { HarvestResult } from '@models/harvest-result.model';
import { fetchMockData } from 'src/services/mock-data.service';

export class MockHortiHarvestResultRepository
  implements HarvestResultRepository
{
  private cache: HarvestResult[] | null = null;

  async getAll(): Promise<HarvestResult[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<HarvestResult[]>('horti-harvests.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<HarvestResult | undefined> {
    const all = await this.getAll();
    return all.find((result) => result.id === id);
  }

  async create(result: HarvestResult): Promise<void> {
    const all = await this.getAll();
    all.push(result);
  }

  async update(id: string, result: Partial<HarvestResult>): Promise<void> {
    const all = await this.getAll();
    const index = all.findIndex((r) => r.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...result };
    }
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    this.cache = all.filter((r) => r.id !== id);
  }
}
