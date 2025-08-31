// models/aquatic-species.model.ts

export interface AquaticSpecies {
  id: string;
  code: string;
  name: string;
  image: string;
  growthDaysMin: number;
  growthDaysMax: number;
  minTempC: number;
  maxTempC: number;
  avgWeightG: number;
  pricePerKg: number;
  costPerSeed: number;
  salinityMinPpt: number;
  salinityMaxPpt: number;
  phMin: number;
  phMax: number;
  systemType: 'Biofloc' | 'RAS' | 'KolamTanah' | 'Tambak' | string;
}
