// frontend/src/repositories/interfaces/HarvestResultRepository.ts

import { HarvestResult } from '@models/harvest-result.model';

export interface HarvestResultRepository {
  getAll(): Promise<HarvestResult[]>;
  getById(id: string): Promise<HarvestResult | undefined>;
  create(result: HarvestResult): Promise<void>;
  update(id: string, result: Partial<HarvestResult>): Promise<void>;
  delete(id: string): Promise<void>;
}
