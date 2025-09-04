// frontend/src/pages/konfigurasi/schema/field-config.ts

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'select' | 'separator';
  required?: boolean;
  disabled?: boolean;
  widthClass?: string;
  colSpan?: number; // grid span (1..n)
  options?: string[]; // untuk select
}
