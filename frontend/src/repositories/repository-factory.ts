// frontend/src/repositories/repository-factory.ts

import { DeviceRepository } from './interfaces/DeviceRepository';
import { MockDeviceRepository } from './mock/MockDeviceRepository';
// import { ApiDeviceRepository } from './api/ApiDeviceRepository'; (nanti)
//import { isMockMode } from '@services/mode';

export function getDeviceRepository(): DeviceRepository {
  return new MockDeviceRepository(); // bisa diswitch ke API nanti
}
