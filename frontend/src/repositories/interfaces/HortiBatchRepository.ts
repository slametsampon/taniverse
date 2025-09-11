// frontend/src/repositories/interfaces/HortiBatchRepository.ts

import { HortiBatch } from '@models/horti-batch.model';

export interface HortiBatchRepository {
  getAll(): Promise<HortiBatch[]>;
  getById(id: string): Promise<HortiBatch | undefined>;
  create(batch: HortiBatch): Promise<void>;
  update(id: string, batch: Partial<HortiBatch>): Promise<void>;
  delete(id: string): Promise<void>;
}
