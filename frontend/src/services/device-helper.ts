// c:\Users\sam294\Documents\Projects\Agro\taniverse\frontend\src\services\device-helper.ts
// DeviceHelper.ts
import { devicesStore } from './devices-store';

export type DeviceState = 'ON' | 'OFF';

export interface DeviceConfig {
  type: 'sensor' | 'actuator';
  value?: number;
  state?: DeviceState;
}

export class DeviceHelper {
  static getSensorValue(id: string): number | null {
    const dev = devicesStore.get(id) as DeviceConfig | undefined;
    return dev?.type === 'sensor' ? dev.value ?? null : null;
  }

  static getActuatorState(id: string): 'ON' | 'OFF' {
    const dev = devicesStore.get(id) as DeviceConfig | undefined;
    return dev?.type === 'actuator' &&
      (dev.state === 'ON' || dev.state === 'OFF')
      ? dev.state
      : 'OFF';
  }

  static getDeviceStatus(tag: string): string {
    const dev = devicesStore.get(tag);
    return dev?.status ?? 'unknown';
  }

  static getStatusClass(status: string): string {
    switch (status) {
      case 'ok':
        return 'text-green-700';
      case 'alarm-low':
      case 'alarm-high':
        return 'text-red-700';
      case 'disconnected':
        return 'text-gray-500 italic';
      default:
        return 'text-yellow-700';
    }
  }
}
