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
        options: STANDARD_UNITS, // value: string (mis. "°C", "%", "ppm", dll)
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'writable',
        label: 'Writable',
        type: 'select',
        options: [
          { value: true, label: 'Ya (Actuator)' },
          { value: false, label: 'Tidak (Sensor)' },
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

  // ✅ Range & Alarm → flattened
  {
    title: 'Range & Alarm',
    fields: [
      {
        key: 'ranges_low',
        label: 'Min',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'ranges_high',
        label: 'Max',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'alarms_low',
        label: 'Alarm Rendah',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'alarms_high',
        label: 'Alarm Tinggi',
        type: 'number',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  // ✅ IO → flattened
  {
    title: 'Koneksi Fisik (IO)',
    fields: [
      {
        key: 'io_bus',
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
        key: 'io_pin',
        label: 'Pin (GPIO/ADC)',
        type: 'number',
        helpText: 'Pin fisik (jika GPIO atau ADC)',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'io_address',
        label: 'I2C Address',
        type: 'text',
        helpText: 'Contoh: 0x40',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'io_channel',
        label: 'Channel',
        type: 'number',
        helpText: 'Channel opsional (ADC multiplexer, dsb)',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  // ✅ Sampling → flattened
  {
    title: 'Sampling (Sensor)',
    fields: [
      {
        key: 'sample_periodMs',
        label: 'Periode Sampling (ms)',
        type: 'number',
        helpText: 'Interval pengambilan data sensor',
        widthClass: 'w-full max-w-md',
      },
      {
        key: 'sample_deadband',
        label: 'Deadband',
        type: 'number',
        helpText: 'Perubahan minimum agar nilai dikirim',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  // ✅ Display → flattened
  {
    title: 'Display',
    fields: [
      {
        key: 'display_precision',
        label: 'Presisi Tampilan',
        type: 'number',
        helpText: 'Jumlah angka di belakang koma',
        widthClass: 'w-full max-w-md',
      },
    ],
  },

  // ✅ Actuator control (allowedStates: string[])
  {
    title: 'Kontrol Aktuator',
    fields: [
      {
        key: 'allowedStates',
        label: 'Daftar State Diizinkan',
        type: 'text',
        helpText:
          'Pisahkan dengan koma, misal: ON,OFF,AUTO (akan di-parse menjadi array)',
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
