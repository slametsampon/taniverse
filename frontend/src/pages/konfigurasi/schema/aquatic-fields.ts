// frontend/src/pages/konfigurasi/schema/aquatic-fields.ts

import type { FieldConfig } from 'src/schema/field-config';

export const aquaticFormFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Nama Spesies',
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
    key: 'avgWeightG',
    label: 'Berat Rata-rata (g)',
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
    label: 'Biaya per Benih',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: '__sep1',
    type: 'separator',
    label: '📊 Parameter Lingkungan',
  },

  {
    key: 'minTempC',
    label: 'Suhu Min (°C)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'maxTempC',
    label: 'Suhu Max (°C)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },

  {
    key: 'salinityMinPpt',
    label: 'Salinitas Min (ppt)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'salinityMaxPpt',
    label: 'Salinitas Max (ppt)',
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
