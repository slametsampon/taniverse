// frontend/src/repositories/api/ApiAquaticBatchRepository.ts

import { AquaticBatchRepository } from '../interfaces/AquaticBatchRepository';
import { AquaticBatch } from '@models/aquatic-batch.model';

export class ApiAquaticBatchRepository implements AquaticBatchRepository {
  private baseUrl = '/api/aquatic-batches'; // sesuaikan endpoint API kamu

  async getAll(): Promise<AquaticBatch[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch aquatic batches');
    return await res.json();
  }

  async getById(id: string): Promise<AquaticBatch | undefined> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async create(batch: AquaticBatch): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    if (!res.ok) throw new Error('Failed to create batch');
  }

  async update(id: string, batch: Partial<AquaticBatch>): Promise<void> {
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
