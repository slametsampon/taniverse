// models/farming-batch.model.ts

export interface FarmingBatch {
  id: string;
  livestockId: string;
  code: string;
  pen: string;
  startDate: string;
  expectedHarvestDate: string;
  initialCount: number;
  currentCount: number;
  status: 'Growing' | 'Harvested' | 'Failed';
  note?: string;
}
