// models/aquaculture-batch.model.ts

export interface AquacultureBatch {
  id: string;
  speciesId: string;
  code: string;
  pond: string;
  startDate: string; // ISO format
  expectedHarvestDate: string;
  initialPopulation: number;
  currentPopulation: number;
  status: 'Growing' | 'Harvested' | 'Failed';
  note?: string;
}
