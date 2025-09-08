// frontend/src/repositories/mock/MockDeviceRepository.ts

import { DeviceRepository } from '../interfaces/DeviceRepository';
import { DeviceModel } from '@models/device.model';
import { fetchMockData } from '../../services/mock-data.service';

export class MockDeviceRepository implements DeviceRepository {
  private cache: DeviceModel[] | null = null;

  async getAll(): Promise<DeviceModel[]> {
    if (!this.cache) {
      this.cache = await fetchMockData<DeviceModel[]>('devices.json');
    }
    return this.cache!;
  }

  async getByTag(tag: string): Promise<DeviceModel | null> {
    const all = await this.getAll();
    return all.find((device) => device.tagNumber === tag) ?? null;
  }
}
