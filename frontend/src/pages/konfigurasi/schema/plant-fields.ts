// frontend/src/pages/konfigurasi/schema/plant-fields.ts

import type { FieldSection } from 'src/schema/field-section';

export const plantFormFields: FieldSection[] = [
  {
    title: 'Informasi Umum',
    fields: [
      {
        key: 'id',
        label: 'ID Tanaman',
        type: 'text',
        required: true,
        helpText: 'Kode unik tanaman',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'name',
        label: 'Nama Tanaman',
        type: 'text',
        required: true,
        widthClass: 'w-full',
        colSpan: 2,
      },
    ],
  },

  {
    title: '📊 Karakteristik',
    fields: [
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
    ],
  },

  {
    title: 'Karakteristik',
    fields: [
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
    ],
  },

  {
    title: 'Parameter Lingkungan',
    fields: [
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
    ],
  },
];
