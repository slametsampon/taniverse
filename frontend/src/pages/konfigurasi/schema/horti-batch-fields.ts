// frontend/src/pages/konfigurasi/schema/horti-batch-fields.ts

import type { FieldConfig } from 'src/pages/konfigurasi/schema/field-config';

export const hortiBatchFields: FieldConfig[] = [
  {
    key: 'ID',
    label: 'Id Kebun',
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
    key: '__sep1',
    type: 'separator',
    label: '🔧 Pengaturan Produksi',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'plantId',
    label: 'ID Tanaman',
    type: 'text',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'initialCount',
    label: 'Jumlah Awal',
    type: 'number',
    required: true,
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'totalPlants',
    label: 'Jumlah Total',
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
    key: '__sep1',
    type: 'separator',
    label: '🔧 Pengaturan Kebun',
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
