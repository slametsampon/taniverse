// frontend/src/pages/konfigurasi/components/livestock-fields.ts

import type { FieldConfig } from './generic-form';

export const livestockFormFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Nama Ternak',
    type: 'text',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'breed',
    label: 'Ras / Jenis',
    type: 'text',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'growthDaysMin',
    label: 'Hari Tumbuh Min',
    type: 'number',
    widthClass: 'w-32',
  },
  {
    key: 'growthDaysMax',
    label: 'Hari Tumbuh Max',
    type: 'number',
    widthClass: 'w-32',
  },

  {
    key: 'avgWeightKg',
    label: 'Berat Rata-rata (kg)',
    type: 'number',
    widthClass: 'w-32',
  },
  {
    key: 'pricePerKg',
    label: 'Harga per Kg',
    type: 'number',
    widthClass: 'w-32',
  },
  {
    key: 'costPerUnit',
    label: 'Biaya per Ekor',
    type: 'number',
    widthClass: 'w-32',
  },

  {
    key: 'tempMinC',
    label: 'Suhu Min (°C)',
    type: 'number',
    widthClass: 'w-28',
  },
  {
    key: 'tempMaxC',
    label: 'Suhu Max (°C)',
    type: 'number',
    widthClass: 'w-28',
  },

  { key: 'phMin', label: 'pH Min', type: 'number', widthClass: 'w-24' },
  { key: 'phMax', label: 'pH Max', type: 'number', widthClass: 'w-24' },
];
