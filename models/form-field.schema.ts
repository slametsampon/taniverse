// models/form-field.schema.ts

export interface FormFieldSchema {
  key: keyof import('./generic-batch-model').GenericBatch;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: string[];
}
