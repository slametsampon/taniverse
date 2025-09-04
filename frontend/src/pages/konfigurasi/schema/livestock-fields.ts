// frontend/src/pages/konfigurasi/schema/livestock-fields.ts

import type { FieldConfig } from '../schema/field-config';

export const livestockFormFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Nama Ternak',
    type: 'text',
    required: true,
    widthClass: 'w-full',
    colSpan: 2,
  },
  {
    key: 'breed',
    label: 'Ras / Jenis',
    type: 'text',
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
    key: 'avgWeightKg',
    label: 'Berat Rata-rata (kg)',
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
    label: 'Biaya per Ekor',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: '__sep1',
    type: 'separator',
    label: '📊 Parameter Lingkungan',
  },
  {
    key: 'tempMinC',
    label: 'Suhu Min (°C)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'tempMaxC',
    label: 'Suhu Max (°C)',
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
