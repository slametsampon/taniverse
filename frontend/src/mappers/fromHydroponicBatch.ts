// frontend/src/mapper/fromHydroponicBatch.ts

import type { HydroponicBatch } from '@models/hydroponic-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';

export function fromHydroponicBatch(batch: HydroponicBatch): GenericBatch {
  return {
    id: batch.id,
    itemId: batch.plantId,
    domain: 'hidroponik',
    location: batch.tray,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.plantCount,
    currentCount: batch.currentCount,
    status: batch.status === 'Planted' ? 'Active' : batch.status,
    note: batch.note ?? '-',
  };
}
