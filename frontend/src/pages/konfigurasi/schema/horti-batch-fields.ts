// frontend/src/pages/konfigurasi/components/horti-batch-fields.ts

import type { FieldConfig } from 'src/pages/konfigurasi/schema/field-config';

export const hortiBatchFields: FieldConfig[] = [
  { key: 'plantId', label: 'ID Tanaman', type: 'text', required: true },
  { key: 'initialCount', label: 'Jumlah Awal', type: 'number', required: true },
  { key: 'totalPlants', label: 'Jumlah Total', type: 'number' },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
  { key: 'expectedHarvestDate', label: 'Estimasi Panen', type: 'date' },
  { key: 'location', label: 'Lokasi', type: 'text', required: true },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
  { key: 'length', label: 'Panjang Lahan (cm)', type: 'number' },
  { key: 'width', label: 'Lebar Lahan (cm)', type: 'number' },
  { key: 'height', label: 'Tinggi (cm)', type: 'number' }, // bisa 0
  { key: 'note', label: 'Catatan', type: 'textarea' },
];
