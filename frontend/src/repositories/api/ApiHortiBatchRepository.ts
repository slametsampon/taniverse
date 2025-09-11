// frontend/src/repositories/api/ApiHortiBatchRepository.ts

import { HortiBatchRepository } from '../interfaces/HortiBatchRepository';
import { PlantingBatch } from '@models/horti-batch.model';

export class ApiHortiBatchRepository implements HortiBatchRepository {
  private baseUrl = '/api/planting-batches';

  async getAll(): Promise<PlantingBatch[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch planting batches');
    return await res.json();
  }

  async getById(id: string): Promise<PlantingBatch | undefined> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async create(batch: PlantingBatch): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    if (!res.ok) throw new Error('Failed to create planting batch');
  }

  async update(id: string, batch: Partial<PlantingBatch>): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    if (!res.ok) throw new Error('Failed to update planting batch');
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete planting batch');
  }
}
