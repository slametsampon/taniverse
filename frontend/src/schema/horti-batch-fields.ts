// frontend/src/schema/horti-batch-fields.ts

import { FieldConfig } from './field-config';

export const hortiBatchFields: FieldConfig[] = [
  { key: 'plantId', label: 'ID Tanaman', type: 'text', required: true },
  { key: 'initialCount', label: 'Jumlah Awal', type: 'number', required: true },
  { key: 'totalPlants', label: 'Total Tanaman', type: 'number' },
  { key: 'startDate', label: 'Tanggal Tanam', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'location', label: 'Lokasi', type: 'text' },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
  { key: 'length', label: 'Panjang (cm)', type: 'number' },
  { key: 'width', label: 'Lebar (cm)', type: 'number' },
  { key: 'height', label: 'Tinggi (cm)', type: 'number' },
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
