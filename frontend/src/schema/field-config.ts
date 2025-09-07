// frontend/src/schema/field-config.ts

export type SelectOption = string | { value: string; label: string };

export interface FieldOption {
  value: string | number | boolean;
  label: string;
}
export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'separator';

  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;

  helpText?: string;
  colSpan?: number;
  widthClass?: string;
  options?: Array<string | FieldOption>; // ✅ lebih fleksibel

  // Untuk pemakaian lintas konteks
  visibleInTable?: boolean;
  showInDetail?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  icon?: string;
  unit?: string;
  formatter?: (val: any) => string;
}
