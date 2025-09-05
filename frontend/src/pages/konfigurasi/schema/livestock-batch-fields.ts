// frontend/src/pages/konfigurasi/schema/livestock-batch-fields.ts

import { FieldConfig } from 'src/schema/field-config';

export const livestockBatchFields: FieldConfig[] = [
  {
    key: 'id',
    label: 'Id Kandang',
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
    key: 'livestockId',
    label: 'ID Ternak',
    type: 'text',
    required: true,
    widthClass: 'w-full max-w-md',
  },

  {
    key: '__sep1',
    type: 'separator',
    label: '🔧 Pengaturan Produksi',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'initialPopulation',
    label: 'Populasi Awal',
    type: 'number',
    required: true,
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
    label: '🔧 Pengaturan Kandang',
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
