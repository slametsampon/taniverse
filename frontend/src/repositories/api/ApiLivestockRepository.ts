// frontend/src/repositories/api/ApiLivestockRepository.ts
import type { Livestock } from '@models/livestock.model';
import type { LivestockRepository } from '../interfaces/LivestockRepository';

export class ApiLivestockRepository implements LivestockRepository {
  async getAll(): Promise<Livestock[]> {
    const res = await fetch('/api/livestock');
    if (!res.ok) throw new Error('Failed to fetch livestock data');
    return await res.json();
  }

  async getById(id: string): Promise<Livestock | null> {
    const all = await this.getAll();
    return all.find((s) => s.id === id) ?? null;
  }
}
