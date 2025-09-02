// frontend/src/pages/konfigurasi/components/plant-fields.ts

import type { FieldConfig } from './generic-form';

export const plantFormFields: FieldConfig[] = [
  { key: 'name', label: 'Nama Tanaman', type: 'text', required: true },
  { key: 'growthDaysMin', label: 'Hari Tumbuh Min', type: 'number' },
  { key: 'growthDaysMax', label: 'Hari Tumbuh Max', type: 'number' },
  { key: 'heightMinCm', label: 'Tinggi Min (cm)', type: 'number' },
  { key: 'heightMaxCm', label: 'Tinggi Max (cm)', type: 'number' },
  { key: 'spacingRowCm', label: 'Jarak Baris (cm)', type: 'number' },
  { key: 'spacingColCm', label: 'Jarak Kolom (cm)', type: 'number' },
  { key: 'ecMin', label: 'EC Min', type: 'number' },
  { key: 'ecMax', label: 'EC Max', type: 'number' },
  { key: 'phMin', label: 'pH Min', type: 'number' },
  { key: 'phMax', label: 'pH Max', type: 'number' },
  { key: 'avgWeightG', label: 'Berat Rata-rata (g)', type: 'number' },
  { key: 'pricePerKg', label: 'Harga per Kg', type: 'number' },
  { key: 'costPerUnit', label: 'Biaya per Tanaman', type: 'number' },
];
