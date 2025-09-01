// frontend/src/mapper/fromPlantingBatch.ts

import type { PlantingBatch } from '@models/plant-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';

export function fromPlantingBatch(batch: PlantingBatch): GenericBatch {
  return {
    id: batch.id,
    itemId: batch.plantId,
    domain: 'hortikultura',
    location: batch.location,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.totalPlants,
    currentCount: batch.totalPlants,
    status: batch.status === 'Planted' ? 'Active' : batch.status,
    note: batch.note,
  };
}
