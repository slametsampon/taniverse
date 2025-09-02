// frontend/src/pages/konfigurasi/components/livestock-fields.ts

import type { FieldConfig } from './generic-form';

export const livestockFormFields: FieldConfig[] = [
  { key: 'name', label: 'Nama Ternak', type: 'text', required: true },
  { key: 'breed', label: 'Ras / Jenis', type: 'text' },
  { key: 'growthDaysMin', label: 'Hari Tumbuh Min', type: 'number' },
  { key: 'growthDaysMax', label: 'Hari Tumbuh Max', type: 'number' },
  { key: 'avgWeightKg', label: 'Berat Rata-rata (kg)', type: 'number' },
  { key: 'pricePerKg', label: 'Harga per Kg', type: 'number' },
  { key: 'costPerUnit', label: 'Biaya per Ekor', type: 'number' },
  { key: 'tempMinC', label: 'Suhu Min (°C)', type: 'number' },
  { key: 'tempMaxC', label: 'Suhu Max (°C)', type: 'number' },
  { key: 'phMin', label: 'pH Min', type: 'number' },
  { key: 'phMax', label: 'pH Max', type: 'number' },
];
