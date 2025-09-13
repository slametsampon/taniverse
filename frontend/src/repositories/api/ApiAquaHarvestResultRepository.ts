// frontend/src/repositories/api/ApiAquaHarvestResultRepository.ts

import { HarvestResultRepository } from '../interfaces/HarvestResultRepository';
import { HarvestResult } from '@models/harvest-result.model';

export class ApiAquaHarvestResultRepository implements HarvestResultRepository {
  private baseUrl = '/api/aqua-harvest-results';

  async getAll(): Promise<HarvestResult[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch harvest results');
    return await res.json();
  }

  async getById(id: string): Promise<HarvestResult | undefined> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async create(result: HarvestResult): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
    if (!res.ok) throw new Error('Failed to create harvest result');
  }

  async update(id: string, result: Partial<HarvestResult>): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
    if (!res.ok) throw new Error('Failed to update harvest result');
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete harvest result');
  }
}
