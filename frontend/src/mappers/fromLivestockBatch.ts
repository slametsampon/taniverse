// frontend/src/mapper/fromLivestockBatch.ts

import type { LivestockBatch } from '@models/livestock-plant-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';

export function fromLivestockBatch(batch: LivestockBatch): GenericBatch {
  return {
    id: batch.id,
    itemId: batch.livestockId,
    domain: 'peternakan',
    location: batch.pen,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialCount,
    currentCount: batch.currentCount,
    status: batch.status === 'Growing' ? 'Active' : batch.status,
    note: batch.note ?? '-',
  };
}
