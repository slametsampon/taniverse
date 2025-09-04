// frontend/src/pages/konfigurasi/schema/hydroponic-batch-fields.ts

import type { FieldConfig } from 'src/pages/konfigurasi/schema/field-config';

export const hydroponicBatchFields: FieldConfig[] = [
  { key: 'location', label: 'Lokasi', type: 'text', required: true },
  { key: 'description', label: 'Deskripsi', type: 'text', required: true },
  { key: 'plantId', label: 'ID Tanaman', type: 'text', required: true },

  { key: '__sep1', type: 'separator', label: '🔧 Pengaturan Produksi' },
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
  { key: 'currentCount', label: 'Jumlah Bibit', type: 'number' },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },

  { key: '__sep2', type: 'separator', label: '🔧 Pengaturan Lahan' },
  { key: 'length', label: 'Panjang (cm)', type: 'number' },
  { key: 'width', label: 'Lebar (cm)', type: 'number' },
  { key: 'height', label: 'Tinggi (cm)', type: 'number' },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
