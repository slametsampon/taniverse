// models/harvest-result.model.ts

export interface HarvestResult {
  id: string;
  batchId: string;
  harvestDate: string;
  totalWeightG: number;
  pricePerKg: number;
  holesUsed: number;
  totalCost: number;
  revenue: number;
  netProfit: number;
}
