// frontend/src/pages/konfigurasi/schema/horti-batch-fields.ts

import type { FieldSection } from 'src/schema/field-section';

export const hortiBatchFields: FieldSection[] = [
  {
    title: 'Informasi Umum',
    fields: [
      {
        key: 'id',
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
    ],
  },
  {
    title: '🔧 Pengaturan Produksi',
    fields: [
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
    ],
  },

  {
    title: '🔧 Dimensi Bedengan',
    fields: [
      {
        key: 'length',
        label: 'Panjang Bedengan (cm)',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'width',
        label: 'Lebar Bedengan (cm)',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'height',
        label: 'Kedalaman Bedengan (cm)',
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
