// frontend/src/models/device-view.model.ts

import type { DeviceStatus } from '@models/device.model';

export interface DeviceView {
  tagNumber: string;
  description: string;
  type: 'sensor' | 'actuator';
  unit: string | null;
  display_precision: number;

  value?: number;
  state?: string;
  status: DeviceStatus;
}
