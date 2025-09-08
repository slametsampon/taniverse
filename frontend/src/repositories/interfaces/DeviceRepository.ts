// frontend/src/repositories/interfaces/DeviceRepository.ts

import { DeviceModel } from '@models/device.model';

export interface DeviceRepository {
  getAll(): Promise<DeviceModel[]>;
  getByTag(tag: string): Promise<DeviceModel | null>;
}
