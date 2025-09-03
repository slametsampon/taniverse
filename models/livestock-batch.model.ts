// models/livestock-batch.model.ts

import { BaseBatch } from './base-batch.model';

export interface LivestockBatch extends BaseBatch {
  livestockId: string;
  initialPopulation: number;
  currentPopulation: number;
  status: 'Growing' | 'Harvested' | 'Failed'; // khusus ternak
}
