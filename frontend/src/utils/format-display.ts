// frontend/src/utils/format-display.ts

import type { Device } from '../services/devices-store';
import { DeviceHelper } from '../services/device-helper';

/**
 * Format tanggal ke format lokal Indonesia (dd-MM-yyyy)
 */
export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return value.toString();
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format nilai dari device (sensor/actuator)
 */
export function formatDeviceValue(device: Device | undefined): string {
  if (!device) return '--';

  if (device.type === 'sensor') {
    const raw = DeviceHelper.getSensorValue(device.tagNumber);
    return raw == null
      ? '--'
      : typeof raw === 'number'
      ? `${raw.toFixed(1)} ${device.unit ?? ''}`.trim()
      : `${raw} ${device.unit ?? ''}`.trim();
  }

  if (device.type === 'actuator') {
    const state = DeviceHelper.getActuatorState(device.tagNumber);
    return state ?? '--';
  }

  return '--';
}

/**
 * Format key dari field tanaman jadi judul yang human-readable
 */
export function formatKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Render nilai field tanaman dalam bentuk display-friendly
 */
export function renderPlantValue(value: any): unknown {
  if (value === null || value === undefined) return '-';

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return formatDate(value);
  }

  if (value instanceof Date) {
    return formatDate(value);
  }

  if (typeof value === 'object') {
    return `<pre class="text-xs bg-gray-100 p-2 rounded">${JSON.stringify(
      value,
      null,
      2
    )}</pre>`;
  }

  return value.toString();
}
