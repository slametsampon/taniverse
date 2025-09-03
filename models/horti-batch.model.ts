// models/horti-batch.model.ts

import { BaseBatch } from './base-batch.model';

export interface PlantingBatch extends BaseBatch {
  plantId: string;
  initialCount: number;
  totalPlants: number;
  status: 'Planted' | 'Harvested' | 'Failed'; // spesifik ke tanaman
}
