// frontend/src/services/device-validator.ts
import type { DeviceModel } from '@models/device.model';

export type ValidationError = { field: string; message: string };

export function validateDevice(
  d: DeviceModel,
  isNew: boolean
): ValidationError[] {
  const errs: ValidationError[] = [];

  if (!d.tagNumber) errs.push({ field: 'tagNumber', message: 'Tag wajib' });
  if (!d.type) errs.push({ field: 'type', message: 'Type wajib' });
  if (!d.description || !String(d.description).trim())
    errs.push({ field: 'description', message: 'Deskripsi wajib' });

  if (isNew && !d.tagNumber.match(/^[a-zA-Z0-9\-_]+$/)) {
    errs.push({
      field: 'tagNumber',
      message: 'Tag hanya boleh huruf/angka/-/_',
    });
  }

  const lo = d.ranges_low ?? null,
    hi = d.ranges_high ?? null;
  if (lo !== null && hi !== null && Number(lo) >= Number(hi))
    errs.push({ field: 'ranges_high', message: 'High harus > Low' });

  const aL = d.alarms_low,
    aH = d.alarms_high;
  if (lo !== null && hi !== null) {
    if (aL !== null && (aL < lo || aL > hi))
      errs.push({ field: 'alarms_low', message: 'Alarm low di luar range' });
    if (aH !== null && (aH < lo || aH > hi))
      errs.push({ field: 'alarms_high', message: 'Alarm high di luar range' });
    if (aL !== null && aH !== null && aL >= aH)
      errs.push({
        field: 'alarms_high',
        message: 'Alarm high harus > alarm low',
      });
  }

  if (!d.io_bus) errs.push({ field: 'io_bus', message: 'Bus wajib' });
  if (d.io_bus === 'gpio' && (d.io_pin === null || isNaN(d.io_pin)))
    errs.push({ field: 'io_pin', message: 'GPIO pin wajib' });
  if (d.io_bus === 'i2c' && !d.io_address)
    errs.push({ field: 'io_address', message: 'I2C address wajib' });
  if (d.io_bus === 'adc' && (d.io_channel === null || isNaN(d.io_channel)))
    errs.push({ field: 'io_channel', message: 'ADC channel wajib' });

  if (d.type === 'actuator') {
    if (!d.writable)
      errs.push({ field: 'writable', message: 'Actuator harus writable' });
    if (!d.allowedStates || d.allowedStates.length === 0)
      errs.push({ field: 'allowedStates', message: 'allowedStates wajib' });
    if (
      d.defaultState &&
      d.allowedStates &&
      !d.allowedStates.includes(d.defaultState)
    )
      errs.push({
        field: 'defaultState',
        message: 'defaultState harus ada di allowedStates',
      });
  }

  return errs;
}
