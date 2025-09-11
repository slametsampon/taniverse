// frontend/src/pages/konfigurasi/schema/livestock-batch-fields.ts

import type { FieldSection } from 'src/schema/field-section';

export const livestockBatchFields: FieldSection[] = [
  {
    title: 'Informasi Umum',
    fields: [
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
    ],
  },
  {
    title: '🔧 Pengaturan Produksi',
    fields: [
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
    ],
  },
  {
    title: '🔧 Pengaturan Kandang',
    fields: [
      {
        key: 'length',
        label: 'Panjang Kandang (cm)',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'width',
        label: 'Lebar Kandang (cm)',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'height',
        label: 'Kedalaman Kandang (cm)',
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
    ],
  },
];
