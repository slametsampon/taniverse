// frontend/src/mappers/fromLivestockBatch.ts

import type { LivestockBatch } from '@models/livestock-plant-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';

export function fromLivestockBatch(batch: LivestockBatch): GenericBatch {
  return {
    id: batch.id,
    itemId: batch.livestockId,
    domain: 'peternakan',
    location: batch.location,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialPopulation,
    currentCount: batch.currentPopulation,
    status: batch.status === 'Growing' ? 'Active' : batch.status,
    note: batch.note ?? '-',
  };
}
