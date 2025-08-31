// models/generic-batch-model.ts

export type BatchStatus = 'Active' | 'Harvested' | 'Failed';

export interface GenericBatch {
  id: string;
  itemId: string;
  location: string;
  startDate: string; // ISO format
  expectedHarvestDate: string; // ISO format
  initialCount: number;
  currentCount: number;
  status: BatchStatus;
  note: string;
}
