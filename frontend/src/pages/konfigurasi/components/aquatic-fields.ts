// frontend/src/pages/konfigurasi/components/aquatic-fields.ts

import type { FieldConfig } from './generic-form';

export const aquaticFormFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Nama Spesies',
    type: 'text',
    required: true,
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
    key: 'avgWeightG',
    label: 'Berat Rata-rata (g)',
    type: 'number',
    widthClass: 'w-40',
  },
  {
    key: 'pricePerKg',
    label: 'Harga per Kg',
    type: 'number',
    widthClass: 'w-40',
  },
  {
    key: 'costPerUnit',
    label: 'Biaya per Benih',
    type: 'number',
    widthClass: 'w-40',
  },

  {
    key: 'minTempC',
    label: 'Suhu Min (°C)',
    type: 'number',
    widthClass: 'w-28',
  },
  {
    key: 'maxTempC',
    label: 'Suhu Max (°C)',
    type: 'number',
    widthClass: 'w-28',
  },

  {
    key: 'salinityMinPpt',
    label: 'Salinitas Min (ppt)',
    type: 'number',
    widthClass: 'w-28',
  },
  {
    key: 'salinityMaxPpt',
    label: 'Salinitas Max (ppt)',
    type: 'number',
    widthClass: 'w-28',
  },

  { key: 'phMin', label: 'pH Min', type: 'number', widthClass: 'w-24' },
  { key: 'phMax', label: 'pH Max', type: 'number', widthClass: 'w-24' },
];
