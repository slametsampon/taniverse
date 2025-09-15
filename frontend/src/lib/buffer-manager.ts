// frontend/src/lib/buffer-manager.ts

import { SensorBuffer } from './buffer';
import type { SensorDataPoint } from '@models/trending.model';
import type { Device } from '@models/device.model';

export class TrendingBufferManager {
  private buffers = new Map<string, SensorBuffer>();

  constructor(devices: Device[], private maxLength = 100) {
    this.initBuffers(devices);
  }

  private initBuffers(devices: Device[]) {
    devices
      .filter((d) => d.type === 'sensor')
      .forEach((d) => {
        this.buffers.set(d.tagNumber, new SensorBuffer(this.maxLength));
      });
  }

  addData(point: SensorDataPoint) {
    const buffer = this.buffers.get(point.tagNumber);
    if (buffer) buffer.add(point);
  }

  getValues(tag: string): number[] {
    return this.buffers.get(tag)?.getValues() || [];
  }

  getLabels(tag: string): string[] {
    return this.buffers.get(tag)?.getLabels() || [];
  }

  getAll(tag: string): SensorDataPoint[] {
    return this.buffers.get(tag)?.getAll() || [];
  }

  clear(tag: string) {
    this.buffers.get(tag)?.clear();
  }

  registerSensor(tag: string) {
    if (!this.buffers.has(tag)) {
      this.buffers.set(tag, new SensorBuffer(this.maxLength));
    }
  }

  getAllTags(): string[] {
    return Array.from(this.buffers.keys());
  }
}
