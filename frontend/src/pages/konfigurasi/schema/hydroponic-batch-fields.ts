// frontend/src/pages/konfigurasi/schema/hydroponic-batch-fields.ts

import type { FieldSection } from 'src/schema/field-section';

export const hydroponicBatchFields: FieldSection[] = [
  {
    title: 'Informasi Umum',
    fields: [
      {
        key: 'id',
        label: 'Id Hidroponik',
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
        key: 'plantId',
        label: 'ID Tanaman',
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
        key: 'system',
        label: 'Sistem Hidroponik',
        type: 'select',
        required: true,
        options: ['NFT', 'DFT', 'DWC', 'Aeroponik'],
      },
      {
        key: 'initialCount',
        label: 'Jumlah Awal Lubang',
        type: 'number',
        required: true,
      },
      {
        key: 'currentCount',
        label: 'Jumlah Bibit',
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
    title: '🔧 Dimensi Hydroponic',
    fields: [
      {
        key: '__sep2',
        type: 'separator',
        label: '🔧 Pengaturan Hidroponik',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'length',
        label: 'Panjang Hydroponic (cm)',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'width',
        label: 'Lebar Hydroponic (cm)',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'height',
        label: 'Kedalaman Hydroponic (cm)',
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
