// frontend/src/mapper/fromHarvestResultHydro.ts

import type { HarvestResult } from '@models/harvest-result.model';
import type { GenericHarvest } from '@models/generic-harvest.model';

export function fromHarvestResultHydro(data: HarvestResult): GenericHarvest {
  return {
    id: data.id,
    batchId: data.batchId,
    domain: 'hidroponik',
    harvestDate: data.harvestDate,
    totalWeightKg: data.totalWeightG / 1000,
    pricePerKg: data.pricePerKg,
    totalCost: data.totalCost,
    revenue: data.revenue,
    netProfit: data.netProfit,
    unit: 'lubang', // Atau 'kg' jika kamu memang ukur berdasarkan berat
  };
}
