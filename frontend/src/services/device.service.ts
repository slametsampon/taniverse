// frontend/src/services/device.service.ts

import type { Device } from '@models/device.model';
import { getDeviceRepository } from '../repositories/repository-factory';

const repo = getDeviceRepository();

export const fetchAllDevices = (): Promise<Device[]> => repo.getAll();
export const fetchDeviceByTag = (tag: string): Promise<Device | null> =>
  repo.getByTag(tag);
