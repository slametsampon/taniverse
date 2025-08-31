// frontend/src/schema/livestock.schema.ts

import type { FormFieldSchema } from '@models/form-field.schema';

export const livestockBatchSchema: FormFieldSchema[] = [
  { key: 'id', label: 'ID Batch', type: 'text', required: true },
  { key: 'itemId', label: 'Jenis Ayam', type: 'text', required: true },
  { key: 'location', label: 'Kandang', type: 'text', required: true },
  { key: 'startDate', label: 'Tanggal Masuk', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'initialCount', label: 'Jumlah DOC Awal', type: 'number' },
  { key: 'currentCount', label: 'Jumlah Saat Ini', type: 'number' },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: ['Active', 'Harvested', 'Failed'],
  },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
