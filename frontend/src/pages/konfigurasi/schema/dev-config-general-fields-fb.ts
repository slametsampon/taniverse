// frontend/src/pages/konfigurasi/schema/dev-config-general-fields-fb.ts

import type { FieldConfig } from 'src/schema/field-config';
import { STANDARD_UNITS } from '../../../../../models/device.model';

export const generalFields: FieldConfig[] = [
  {
    key: 'tagNumber',
    label: 'Tag Number',
    type: 'text',
    required: true,
    helpText: 'Kode unik untuk perangkat ini',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'type',
    label: 'Tipe Perangkat',
    type: 'select',
    required: true,
    options: [
      { value: 'sensor', label: 'Sensor' },
      { value: 'actuator', label: 'Actuator' },
    ],
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'description',
    label: 'Deskripsi',
    type: 'textarea',
    helpText: 'Penjelasan singkat mengenai perangkat',
    widthClass: 'w-full',
    colSpan: 2,
  },
  {
    key: 'unit',
    label: 'Satuan (Unit)',
    type: 'select',
    options: STANDARD_UNITS,
    helpText: 'Digunakan untuk interpretasi nilai sensor',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'writable',
    label: 'Writable (Actuator)',
    type: 'select',
    options: [
      { value: 'true', label: 'Ya (Actuator)' },
      { value: 'false', label: 'Tidak (Sensor)' },
    ],
    helpText: 'Pilih "Ya" jika perangkat ini actuator',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'location',
    label: 'Lokasi',
    type: 'text',
    helpText: 'Tempat atau titik di mana perangkat berada',
    widthClass: 'w-full',
    colSpan: 2,
  },

  // ===== RANGES =====
  {
    key: '',
    label: 'Rentang Nilai (Ranges)',
    type: 'separator',
    colSpan: 2,
    widthClass: 'w-full',
  },
  {
    key: 'ranges.low',
    label: 'Nilai Minimum',
    type: 'number',
    helpText: 'Nilai minimum (range)',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'ranges.high',
    label: 'Nilai Maksimum',
    type: 'number',
    helpText: 'Nilai maksimum (range)',
    widthClass: 'w-full max-w-md',
  },

  // ===== ALARMS =====
  {
    key: '',
    label: 'Ambang Alarm',
    type: 'separator',
    colSpan: 2,
    widthClass: 'w-full',
  },
  {
    key: 'alarms.low',
    label: 'Alarm Rendah',
    type: 'number',
    helpText: 'Batas bawah sebelum alarm aktif',
    widthClass: 'w-full max-w-md',
  },
  {
    key: 'alarms.high',
    label: 'Alarm Tinggi',
    type: 'number',
    helpText: 'Batas atas sebelum alarm aktif',
    widthClass: 'w-full max-w-md',
  },
];
