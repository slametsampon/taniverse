// frontend/src/pages/konfigurasi/schema/dev-config-general-fields-fb.ts

import type { FieldSection } from 'src/schema/field-section';
import { STANDARD_UNITS } from '../../../../../models/device.model';

export const generalFieldSections: FieldSection[] = [
  {
    title: 'Informasi Umum',
    fields: [
      {
        key: 'tagNumber',
        label: 'Tag Number',
        type: 'text',
        required: true,
        helpText: 'Kode unik perangkat',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'type',
        label: 'Tipe',
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
        widthClass: 'w-full',
        colSpan: 2,
      },
      {
        key: 'unit',
        label: 'Satuan',
        type: 'select',
        options: STANDARD_UNITS,
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'writable',
        label: 'Writable',
        type: 'select',
        options: [
          { value: 'true', label: 'Ya (Actuator)' },
          { value: 'false', label: 'Tidak (Sensor)' },
        ],
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'location',
        label: 'Lokasi',
        type: 'text',
        widthClass: 'w-full',
        colSpan: 2,
      },
    ],
  },

  {
    title: 'Range & Alarm',
    fields: [
      {
        key: 'ranges.low',
        label: 'Min',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'ranges.high',
        label: 'Max',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'alarms.low',
        label: 'Alarm Rendah',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'alarms.high',
        label: 'Alarm Tinggi',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  {
    title: 'Koneksi Fisik (IO)',
    fields: [
      {
        key: 'io.bus',
        label: 'Tipe Bus',
        type: 'select',
        options: [
          { value: 'gpio', label: 'GPIO' },
          { value: 'adc', label: 'ADC' },
          { value: 'i2c', label: 'I2C' },
        ],
        widthClass: 'w-full max-w-md',
        required: true,
      },
      {
        key: 'io.pin',
        label: 'Pin (GPIO/ADC)',
        type: 'number',
        helpText: 'Pin fisik (jika GPIO atau ADC)',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'io.address',
        label: 'I2C Address',
        type: 'text',
        helpText: 'Contoh: 0x40',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'io.channel',
        label: 'Channel',
        type: 'number',
        helpText: 'Channel opsional (ADC multiplexer, dsb)',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  {
    title: 'Sampling (Sensor)',
    fields: [
      {
        key: 'sample.periodMs',
        label: 'Periode Sampling (ms)',
        type: 'number',
        helpText: 'Interval pengambilan data sensor',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'sample.deadband',
        label: 'Deadband',
        type: 'number',
        helpText: 'Perubahan minimum agar nilai dikirim',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  {
    title: 'Display',
    fields: [
      {
        key: 'display.precision',
        label: 'Presisi Tampilan',
        type: 'number',
        helpText: 'Jumlah angka di belakang koma',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  {
    title: 'Kontrol Aktuator',
    fields: [
      {
        key: 'allowedStates',
        label: 'Daftar State Diizinkan',
        type: 'text',
        helpText: 'Pisahkan dengan koma, misal: ON,OFF,AUTO (khusus actuator)',
        widthClass: 'w-full',
        colSpan: 2,
      },
      {
        key: 'defaultState',
        label: 'State Default',
        type: 'text',
        helpText: 'State awal saat startup',
        widthClass: 'w-full max-w-md',
      },
    ],
  },
];
