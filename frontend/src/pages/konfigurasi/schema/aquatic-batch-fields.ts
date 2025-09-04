// frontend/src/pages/konfigurasi/schema/aquatic-batch-fields.ts

import type { FieldConfig } from '../schema/field-config';

export const aquaticBatchFields: FieldConfig[] = [
  { key: 'description', label: 'Deskripsi', type: 'text', required: true },
  { key: 'location', label: 'Kolam', type: 'text', required: true },
  { key: 'speciesId', label: 'ID Spesies', type: 'text', required: true },

  { key: '__sep1', type: 'separator', label: '🔧 Pengaturan Produksi' },
  {
    key: 'initialPopulation',
    label: 'Populasi Awal',
    type: 'number',
    required: true,
  },
  { key: 'currentPopulation', label: 'Populasi Saat Ini', type: 'number' },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },

  { key: '__sep2', type: 'separator', label: '🔧 Pengaturan Kolam' },
  { key: 'length', label: 'Panjang Kolam (cm)', type: 'number' },
  { key: 'width', label: 'Lebar Kolam (cm)', type: 'number' },
  { key: 'height', label: 'Kedalaman Kolam (cm)', type: 'number' },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
