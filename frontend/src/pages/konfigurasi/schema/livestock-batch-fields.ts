// frontend/src/pages/konfigurasi/components/livestock-batch-fields.ts

import { FieldConfig } from 'src/pages/konfigurasi/schema/field-config';

export const livestockBatchFields: FieldConfig[] = [
  { key: 'livestockId', label: 'ID Ternak', type: 'text', required: true },
  {
    key: 'initialPopulation',
    label: 'Populasi Awal',
    type: 'number',
    required: true,
  },
  { key: 'currentPopulation', label: 'Populasi Saat Ini', type: 'number' },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'location', label: 'Kandang / Lokasi', type: 'text', required: true },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
  { key: 'length', label: 'Panjang Kandang (cm)', type: 'number' },
  { key: 'width', label: 'Lebar Kandang (cm)', type: 'number' },
  { key: 'height', label: 'Tinggi Kandang (cm)', type: 'number' },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
