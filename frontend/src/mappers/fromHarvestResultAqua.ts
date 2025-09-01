// frontend/src/mapper/fromHarvestResultAqua.ts
import type { HarvestResult } from '@models/harvest-result.model';
import type { GenericHarvest } from '@models/generic-harvest.model';

export function fromHarvestResultAqua(data: HarvestResult): GenericHarvest {
  return {
    id: data.id,
    batchId: data.batchId,
    domain: 'akuakultur',
    harvestDate: data.harvestDate,
    totalWeightKg: data.totalWeightG / 1000,
    pricePerKg: data.pricePerKg,
    totalCost: data.totalCost,
    revenue: data.revenue,
    netProfit: data.netProfit,
    unit: 'kg',
  };
}
