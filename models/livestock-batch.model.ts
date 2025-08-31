// models/livestock-plant-batch.model.ts

export interface LivestockBatch {
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
