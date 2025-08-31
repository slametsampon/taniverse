// models/batch.model.ts

export interface PlantingBatch {
  id: string;
  plantId: string;
  code: string;
  location: string;
  startDate: string; // ISO format
  expectedHarvestDate: string;
  holesUsed: number;
  totalPlants: number;
  status: 'Planted' | 'Harvested' | 'Failed';
  note?: string;
}
