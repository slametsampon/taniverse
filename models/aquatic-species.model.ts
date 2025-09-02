// models/aquatic-species.model.ts

import { BaseSpecies } from './base-species.model';
import { EnvironmentalRequirement } from './environmental-requirement.model';
import { EconomicModel } from './economic.model';

export interface AquaticSpecies
  extends BaseSpecies,
    EnvironmentalRequirement,
    EconomicModel {
  // Tidak perlu tambahan field spesifik saat ini,
  // tetapi bisa ditambahkan jika ada: e.g. oxygenRange, DO, dll.
}
