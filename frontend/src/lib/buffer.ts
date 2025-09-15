// frontend/src/lib/buffer.ts

import type { SensorDataPoint } from '@models/trending.model';

export class SensorBuffer {
  private buffer: SensorDataPoint[] = [];

  constructor(private maxLength: number) {}

  add(point: SensorDataPoint) {
    this.buffer.push(point);
    if (this.buffer.length > this.maxLength) {
      this.buffer.shift(); // buang data terlama
    }
  }

  getAll(): SensorDataPoint[] {
    return [...this.buffer];
  }

  getLabels(): string[] {
    return this.buffer.map((d) =>
      new Date(d.timestamp * 1000).toLocaleTimeString()
    );
  }

  getValues(): number[] {
    return this.buffer.map((d) => d.value);
  }

  clear() {
    this.buffer = [];
  }
}
