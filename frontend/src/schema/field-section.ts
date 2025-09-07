// frontend/src/schema/field-section.ts

import type { FieldConfig } from './field-config';

export interface FieldSection {
  title: string;
  desc?: string;
  fields: FieldConfig[];
}
