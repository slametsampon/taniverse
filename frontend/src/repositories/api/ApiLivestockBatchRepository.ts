// frontend/src/repositories/api/ApiLivestockBatchRepository.ts

import { LivestockBatchRepository } from '../interfaces/LivestockBatchRepository';
import { LivestockBatch } from '@models/livestock-batch.model';

export class ApiLivestockBatchRepository implements LivestockBatchRepository {
  private baseUrl = '/api/livestock-batches';

  async getAll(): Promise<LivestockBatch[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch livestock batches');
    return await res.json();
  }

  async getById(id: string): Promise<LivestockBatch | undefined> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async create(batch: LivestockBatch): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    if (!res.ok) throw new Error('Failed to create batch');
  }

  async update(id: string, batch: Partial<LivestockBatch>): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    if (!res.ok) throw new Error('Failed to update batch');
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete batch');
  }
}
