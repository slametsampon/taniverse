// frontend/src/repositories/interfaces/HydroponicBatchRepository.ts

import { HydroponicBatch } from '@models/hydroponic-batch.model';

export interface HydroponicBatchRepository {
  getAll(): Promise<HydroponicBatch[]>;
  getById(id: string): Promise<HydroponicBatch | undefined>;
  create(batch: HydroponicBatch): Promise<void>;
  update(id: string, batch: Partial<HydroponicBatch>): Promise<void>;
  delete(id: string): Promise<void>;
}
