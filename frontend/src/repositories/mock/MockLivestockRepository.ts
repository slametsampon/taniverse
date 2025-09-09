// frontend/src/repositories/mock/MockLivestockRepository.ts
import type { Livestock } from '@models/livestock.model';
import { fetchMockData } from 'src/services/mock-data.service';
import type { LivestockRepository } from '../interfaces/LivestockRepository';

export class MockLivestockRepository implements LivestockRepository {
  private cache: Livestock[] | null = null;

  async getAll(): Promise<Livestock[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<Livestock[]>('livestock.json');
    }
    return this.cache!;
  }

  async getById(id: string): Promise<Livestock | null> {
    const all = await this.getAll();
    return all.find((s) => s.id === id) ?? null;
  }
}
