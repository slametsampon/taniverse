// frontend/src/mappers/fromHydroponicBatch.ts

import type { HydroponicBatch } from '@models/hydroponic-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';

export function fromHydroponicBatch(batch: HydroponicBatch): GenericBatch {
  return {
    id: batch.id,
    itemId: batch.plantId,
    domain: 'hidroponik',
    location: batch.location,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialCount,
    currentCount: batch.currentCount,
    status: batch.status === 'Planted' ? 'Active' : batch.status,
    note: batch.note ?? '-',
  };
}
