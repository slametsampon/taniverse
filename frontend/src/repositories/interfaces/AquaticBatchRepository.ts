// frontend/src/repositories/interfaces/AquaticBatchRepository.ts

import { AquaticBatch } from '@models/aquatic-batch.model';

export interface AquaticBatchRepository {
  getAll(): Promise<AquaticBatch[]>;
  getById(id: string): Promise<AquaticBatch | undefined>;
  create(batch: AquaticBatch): Promise<void>;
  update(id: string, batch: Partial<AquaticBatch>): Promise<void>;
  delete(id: string): Promise<void>;
}
