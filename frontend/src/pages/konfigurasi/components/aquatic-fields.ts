// frontend/src/pages/konfigurasi/components/aquatic-fields.ts

import type { FieldConfig } from './generic-form';

export const aquaticFormFields: FieldConfig[] = [
  { key: 'name', label: 'Nama Spesies', type: 'text', required: true },
  { key: 'growthDaysMin', label: 'Hari Tumbuh Min', type: 'number' },
  { key: 'growthDaysMax', label: 'Hari Tumbuh Max', type: 'number' },
  { key: 'avgWeightG', label: 'Berat Rata-rata (g)', type: 'number' },
  { key: 'pricePerKg', label: 'Harga per Kg', type: 'number' },
  { key: 'costPerUnit', label: 'Biaya per Benih', type: 'number' },
  { key: 'minTempC', label: 'Suhu Min (°C)', type: 'number' },
  { key: 'maxTempC', label: 'Suhu Max (°C)', type: 'number' },
  { key: 'salinityMinPpt', label: 'Salinitas Min (ppt)', type: 'number' },
  { key: 'salinityMaxPpt', label: 'Salinitas Max (ppt)', type: 'number' },
  { key: 'phMin', label: 'pH Min', type: 'number' },
  { key: 'phMax', label: 'pH Max', type: 'number' },
];
