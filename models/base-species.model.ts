// models/base-species.model.ts

export interface BaseSpecies {
  id: string;
  name: string;
  image: string;
  growthDaysMin: number;
  growthDaysMax: number;
  pricePerKg: number;
}
