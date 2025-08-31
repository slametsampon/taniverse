// frontend/src/schema/aquatic.schema.ts

import type { FormFieldSchema } from '@models/form-field.schema';

export const aquaticBatchSchema: FormFieldSchema[] = [
  { key: 'id', label: 'ID Batch', type: 'text', required: true },
  { key: 'itemId', label: 'Jenis Ikan', type: 'text', required: true },
  { key: 'location', label: 'Kolam', type: 'text', required: true },
  { key: 'startDate', label: 'Tanggal Tebar', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'initialCount', label: 'Jumlah Benih Awal', type: 'number' },
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
