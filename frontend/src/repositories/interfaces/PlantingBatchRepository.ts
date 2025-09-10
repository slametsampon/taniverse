// frontend/src/repositories/interfaces/PlantingBatchRepository.ts

import { PlantingBatch } from '@models/horti-batch.model';

export interface PlantingBatchRepository {
  getAll(): Promise<PlantingBatch[]>;
  getById(id: string): Promise<PlantingBatch | undefined>;
  create(batch: PlantingBatch): Promise<void>;
  update(id: string, batch: Partial<PlantingBatch>): Promise<void>;
  delete(id: string): Promise<void>;
}
