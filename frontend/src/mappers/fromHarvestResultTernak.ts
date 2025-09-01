// frontend/src/mapper/fromHarvestResultTernak.ts

import type { HarvestResult } from '@models/harvest-result.model';
import type { GenericHarvest } from '@models/generic-harvest.model';

export function fromHarvestResultTernak(data: HarvestResult): GenericHarvest {
  return {
    id: data.id,
    batchId: data.batchId,
    domain: 'peternakan',
    harvestDate: data.harvestDate,
    totalWeightKg: data.totalWeightG / 1000,
    pricePerKg: data.pricePerKg,
    totalCost: data.totalCost,
    revenue: data.revenue,
    netProfit: data.netProfit,
    unit: 'ekor',
  };
}
