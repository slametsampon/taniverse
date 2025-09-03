// frontend/src/pages/konfigurasi/components/hydroponic-batch-fields.ts

import type { FieldConfig } from 'src/schema/field-config';

export const hydroponicBatchFields: FieldConfig[] = [
  { key: 'plantId', label: 'ID Tanaman', type: 'text', required: true },
  { key: 'code', label: 'Kode Batch', type: 'text', required: true },
  {
    key: 'system',
    label: 'Sistem Hidroponik',
    type: 'select',
    required: true,
    options: ['NFT', 'DFT', 'DWC', 'Aeroponik'],
  },
  { key: 'location', label: 'Lokasi', type: 'text', required: true },
  {
    key: 'initialCount',
    label: 'Jumlah Awal Lubang',
    type: 'number',
    required: true,
  },
  { key: 'currentCount', label: 'Jumlah Bibit', type: 'number' },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'length', label: 'Panjang (cm)', type: 'number' },
  { key: 'width', label: 'Lebar (cm)', type: 'number' },
  { key: 'height', label: 'Tinggi (cm)', type: 'number' },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
