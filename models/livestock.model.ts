// models/livestock.model.ts

import { BaseSpecies } from './base-species.model';
import { EnvironmentalRequirement } from './environmental-requirement.model';
import { EconomicModel } from './economic.model';

export interface Livestock
  extends BaseSpecies,
    EnvironmentalRequirement,
    EconomicModel {
  breed: string;
}
