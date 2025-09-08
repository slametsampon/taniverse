// frontend/src/repositories/interfaces/DeviceRepository.ts

import { DeviceFlatModel } from '@models/device.model';

export interface DeviceRepository {
  getAll(): Promise<DeviceFlatModel[]>;
  getByTag(tag: string): Promise<DeviceFlatModel | null>;
}
