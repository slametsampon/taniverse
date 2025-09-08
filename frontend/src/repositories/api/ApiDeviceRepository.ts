// frontend/src/repositories/api/ApiDeviceRepository.ts

import type { Device } from '../../services/devices-service';
import type { DeviceRepository } from '../interfaces/DeviceRepository';

export class ApiDeviceRepository implements DeviceRepository {
  private baseUrl = '/api/devices';

  async getAll(): Promise<Device[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) {
      throw new Error(
        `[ApiDeviceRepository] Failed to fetch devices: ${res.status}`
      );
    }
    return await res.json();
  }

  async getByTag(tag: string): Promise<Device | null> {
    const res = await fetch(`${this.baseUrl}/${encodeURIComponent(tag)}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(
        `[ApiDeviceRepository] Failed to fetch device: ${res.status}`
      );
    }
    return await res.json();
  }
}
