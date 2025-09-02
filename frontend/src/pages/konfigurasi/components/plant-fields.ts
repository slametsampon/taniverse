// frontend/src/pages/konfigurasi/components/plant-fields.ts

import type { FieldConfig } from './generic-form';

export const plantFormFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Nama Tanaman',
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
    key: 'heightMinCm',
    label: 'Tinggi Min (cm)',
    type: 'number',
    widthClass: 'w-28',
  },
  {
    key: 'heightMaxCm',
    label: 'Tinggi Max (cm)',
    type: 'number',
    widthClass: 'w-28',
  },

  {
    key: 'spacingRowCm',
    label: 'Jarak Baris (cm)',
    type: 'number',
    widthClass: 'w-28',
  },
  {
    key: 'spacingColCm',
    label: 'Jarak Kolom (cm)',
    type: 'number',
    widthClass: 'w-28',
  },

  { key: 'ecMin', label: 'EC Min', type: 'number', widthClass: 'w-24' },
  { key: 'ecMax', label: 'EC Max', type: 'number', widthClass: 'w-24' },

  { key: 'phMin', label: 'pH Min', type: 'number', widthClass: 'w-24' },
  { key: 'phMax', label: 'pH Max', type: 'number', widthClass: 'w-24' },

  {
    key: 'avgWeightG',
    label: 'Berat Rata-rata (g)',
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
    label: 'Biaya per Tanaman',
    type: 'number',
    widthClass: 'w-32',
  },
];
