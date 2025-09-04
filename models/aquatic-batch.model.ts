// models/aquatic-batch.model.ts

import { BaseBatch } from './base-batch.model';

export interface AquaticBatch extends BaseBatch {
  speciesId: string;
  initialPopulation: number;
  currentPopulation: number;
  status: 'Growing' | 'Harvested' | 'Failed';
}
