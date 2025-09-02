// models/plant.model.ts

import { BaseSpecies } from './base-species.model';
import { EnvironmentalRequirement } from './environmental-requirement.model';
import { EconomicModel } from './economic.model';

export interface Plant
  extends BaseSpecies,
    EnvironmentalRequirement,
    EconomicModel {
  heightMinCm: number;
  heightMaxCm: number;

  spacingRowCm: number; // Jarak antar baris (cm)
  spacingColCm: number; // Jarak antar tanaman dalam baris (cm)
}
