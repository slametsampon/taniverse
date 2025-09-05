// frontend/src/pages/konfigurasi/schema/field-config.ts

export type SelectOption = string | { value: string; label: string };

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'separator';
  required?: boolean;
  disabled?: boolean;
  colSpan?: number;
  widthClass?: string;
  options?: SelectOption[];
}
