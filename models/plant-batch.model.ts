// models/plant-batch.model.ts

export interface PlantingBatch {
  id: string;
  plantId: string;
  location: string;
  startDate: string; // ISO format
  expectedHarvestDate: string;
  initialCount: number;
  totalPlants: number;
  status: 'Planted' | 'Harvested' | 'Failed';
  note: string;
}
