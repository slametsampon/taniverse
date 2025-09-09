// frontend/src/repositories/interfaces/LivestockRepository.ts
import type { Livestock } from '@models/livestock.model';

export interface LivestockRepository {
  getAll(): Promise<Livestock[]>;
  getById(id: string): Promise<Livestock | null>;
}
