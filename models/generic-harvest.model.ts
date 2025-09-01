// models/generic-harvest.model.ts
export interface GenericHarvest {
  id: string;
  batchId: string;
  domain: 'hortikultura' | 'akuakultur' | 'peternakan' | 'hidroponik';
  harvestDate: string;
  totalWeightKg: number;
  pricePerKg: number;
  totalCost: number;
  revenue: number;
  netProfit: number;
  unit: string; // "kg", "ekor", "lubang", etc.
  note?: string;
}
