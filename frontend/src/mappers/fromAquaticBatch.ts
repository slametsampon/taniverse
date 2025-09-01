// frontend/src/mappers/fromAquaticBatch.ts

import type { AquaticBatch } from '@models/aquatic-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';

export function fromAquaticBatch(batch: AquaticBatch): GenericBatch {
  return {
    id: batch.id,
    itemId: batch.speciesId,
    domain: 'akuakultur',
    location: batch.pond,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialCount,
    currentCount: batch.currentCount,
    status: batch.status === 'Growing' ? 'Active' : batch.status,
    note: batch.note ?? '-',
  };
}
