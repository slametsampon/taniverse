// frontend/src/lib/buffer-singleton.ts

import { TrendingBufferManager } from './buffer-manager';
import { fetchAllDevices } from 'src/services/device.service';

let _bufferManager: TrendingBufferManager | null = null;

export const getBufferManager = async (): Promise<TrendingBufferManager> => {
  if (_bufferManager) return _bufferManager;

  const devices = await fetchAllDevices();
  _bufferManager = new TrendingBufferManager(devices, 100);

  return _bufferManager;
};
