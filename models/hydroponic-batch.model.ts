// models/hydroponic-batch.model.ts

import { BaseBatch } from './base-batch.model';

export interface HydroponicBatch extends BaseBatch {
  plantId: string;
  system: 'NFT' | 'DFT' | 'DWC' | 'Aeroponik' | string;
  initialCount: number;
  currentCount: number;
  status: 'Planted' | 'Harvested' | 'Failed';
}
