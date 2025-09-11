// frontend/src/repositories/api/ApiHydroponicBatchRepository.ts

import { HydroponicBatchRepository } from '../interfaces/HydroponicBatchRepository';
import { HydroponicBatch } from '@models/hydroponic-batch.model';

export class ApiHydroponicBatchRepository implements HydroponicBatchRepository {
  private baseUrl = '/api/hydroponic-batches';

  async getAll(): Promise<HydroponicBatch[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch hydroponic batches');
    return await res.json();
  }

  async getById(id: string): Promise<HydroponicBatch | undefined> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async create(batch: HydroponicBatch): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    if (!res.ok) throw new Error('Failed to create batch');
  }

  async update(id: string, batch: Partial<HydroponicBatch>): Promise<void> {
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
