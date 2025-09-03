// models/hydroponic-batch.model.ts

import { BaseBatch } from './base-batch.model';

export interface HydroponicBatch extends BaseBatch {
  plantId: string;
  system: 'NFT' | 'DFT' | 'DWC' | 'Aeroponik' | string;
  code: string; // ID batch internal atau display
  initialCount: number;
  currentCount: number;
  status: 'Planted' | 'Harvested' | 'Failed';
}
