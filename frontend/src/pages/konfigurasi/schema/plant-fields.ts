// frontend/src/pages/konfigurasi/schema/plant-fields.ts

import type { FieldConfig } from '../schema/field-config';

export const plantFormFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Nama Tanaman',
    type: 'text',
    required: true,
    widthClass: 'w-full',
    colSpan: 2,
  },

  {
    key: 'growthDaysMin',
    label: 'Hari Tumbuh Min',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'growthDaysMax',
    label: 'Hari Tumbuh Max',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'pricePerKg',
    label: 'Harga per Kg',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'costPerUnit',
    label: 'Biaya per Tanaman',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'avgWeightG',
    label: 'Berat Rata-rata (g)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: '__sep1',
    type: 'separator',
    label: '📊 Parameter karakter',
  },

  {
    key: 'heightMinCm',
    label: 'Tinggi Min (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'heightMaxCm',
    label: 'Tinggi Max (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'spacingRowCm',
    label: 'Jarak Baris (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'spacingColCm',
    label: 'Jarak Kolom (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: '__sep1',
    type: 'separator',
    label: '📊 Parameter Lingkungan',
  },

  {
    key: 'ecMin',
    label: 'EC Min',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'ecMax',
    label: 'EC Max',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'phMin',
    label: 'pH Min',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'phMax',
    label: 'pH Max',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
];
