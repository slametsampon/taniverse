// models/environmental-requirement.model.ts

export interface EnvironmentalRequirement {
  tempMinC?: number;
  tempMaxC?: number;
  phMin?: number;
  phMax?: number;
  salinityMinPpt?: number;
  salinityMaxPpt?: number;
  ecMin?: number;
  ecMax?: number;
}
