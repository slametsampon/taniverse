// frontend/src/schema/planting.schema.ts

import type { FormFieldSchema } from '@models/form-field.schema';

export const plantingBatchSchema: FormFieldSchema[] = [
  { key: 'id', label: 'ID Batch', type: 'text', required: true },
  { key: 'itemId', label: 'Plant ID', type: 'text', required: true },
  { key: 'location', label: 'Tray / Lokasi', type: 'text', required: true },
  { key: 'startDate', label: 'Tanggal Tanam', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'initialCount', label: 'Jumlah Awal', type: 'number' },
  { key: 'currentCount', label: 'Jumlah Sekarang', type: 'number' },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: ['Active', 'Harvested', 'Failed'],
  },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
