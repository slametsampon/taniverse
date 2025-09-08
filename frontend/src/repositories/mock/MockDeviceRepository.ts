// frontend/src/repositories/mock/MockDeviceRepository.ts

import { DeviceRepository } from '../interfaces/DeviceRepository';
import { DeviceFlatModel } from '@models/device.model';
import { fetchMockData } from '@services/mock-data.service';

export class MockDeviceRepository implements DeviceRepository {
  private cache: DeviceFlatModel[] | null = null;

  async getAll(): Promise<DeviceFlatModel[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<DeviceFlatModel[]>('devices.json');
    }
    return this.cache!;
  }

  async getByTag(tag: string): Promise<DeviceFlatModel | null> {
    const all = await this.getAll();
    return all.find((device) => device.tagNumber === tag) ?? null;
  }
}
