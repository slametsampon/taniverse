// frontend/src/pages/konfigurasi/schema/aquatic-batch-fields.ts

import type { FieldConfig } from '../schema/field-config';

export const aquaticBatchFields: FieldConfig[] = [
  {
    key: 'ID',
    label: 'Id Kolam',
    type: 'text',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'location',
    label: 'Lokasi',
    type: 'text',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'description',
    label: 'Deskripsi',
    type: 'text',
    required: true,
    widthClass: 'w-full',
    colSpan: 2,
  },
  {
    key: 'speciesId',
    label: 'ID Spesies',
    type: 'text',
    required: true,
    widthClass: 'w-full max-w-md',
  },

  { key: '__sep1', type: 'separator', label: '🔧 Pengaturan Produksi' },
  {
    key: 'initialPopulation',
    label: 'Populasi Awal',
    type: 'number',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'currentPopulation',
    label: 'Populasi Saat Ini',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'startDate',
    label: 'Tanggal Mulai',
    type: 'date',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'expectedHarvestDate',
    label: 'Estimasi Panen',
    type: 'date',
    widthClass: 'w-full max-w-md',
  },

  {
    key: '__sep2',
    type: 'separator',
    label: '🔧 Pengaturan Kolam',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'length',
    label: 'Panjang Kolam (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'width',
    label: 'Lebar Kolam (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'height',
    label: 'Kedalaman Kolam (cm)',
    type: 'number',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'note',
    label: 'Catatan',
    type: 'textarea',
    widthClass: 'w-full',
    colSpan: 2,
  },
];
