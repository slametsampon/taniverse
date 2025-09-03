// frontend/src/pages/konfigurasi/schema/aquatic-batch-fields.ts

import type { FieldConfig } from '../schema/field-config';

export const aquaticBatchFields: FieldConfig[] = [
  { key: 'speciesId', label: 'ID Spesies', type: 'text', required: true },
  { key: 'code', label: 'Kode Batch', type: 'text', required: true },
  { key: 'pond', label: 'Kolam', type: 'text', required: true },
  {
    key: 'initialPopulation',
    label: 'Populasi Awal',
    type: 'number',
    required: true,
  },
  { key: 'currentPopulation', label: 'Populasi Saat Ini', type: 'number' },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'length', label: 'Panjang Kolam (cm)', type: 'number' },
  { key: 'width', label: 'Lebar Kolam (cm)', type: 'number' },
  { key: 'height', label: 'Kedalaman Kolam (cm)', type: 'number' },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
