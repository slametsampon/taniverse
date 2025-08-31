// frontend/src/pages/konfigurasi/events/device-events.ts

import type { DeviceConfig } from '@models/device.model';
import {
  getByTag,
  loadDevices,
  upsertDevice,
  deleteDevice,
} from '../../../services/devices-config.service';

type Device = DeviceConfig<any>;

export class DeviceEvents {
  static async handleTagPicked(
    tag: string,
    tags: string[],
    setDevice: (d: Device, mode: 'new' | 'edit') => void
  ) {
    let found = getByTag<Device>(tag);

    if (!found) {
      const list = await loadDevices<Device>();
      const f = list.find((d) => d.tagNumber === tag);
      if (f) {
        setDevice(structuredClone(f), 'edit');
      }
      return;
    }

    setDevice(structuredClone(found), 'edit');
  }

  static async loadAllDevices(): Promise<DeviceConfig<any>[]> {
    return await loadDevices<DeviceConfig<any>>();
  }

  static async handleDelete(
    tag: string,
    tags: string[],
    onAfterDelete: (nextDevice?: Device, mode?: 'new' | 'edit') => void
  ): Promise<boolean> {
    if (!tag) return false;

    const confirm1 = confirm(
      'Perubahan belum disimpan akan hilang.\nHapus device ini?'
    );
    const confirm2 = confirm(`Hapus device "${tag}"?`);

    if (!confirm1 || !confirm2) return false;

    try {
      await deleteDevice(tag);
      const updatedTags = tags.filter((t) => t !== tag);
      const list = await loadDevices<Device>();
      const nextDev = list.find((d) => d.tagNumber === updatedTags[0]);

      if (nextDev) {
        onAfterDelete(structuredClone(nextDev), 'edit');
      } else {
        onAfterDelete();
      }

      return true;
    } catch (err: any) {
      alert(`Gagal hapus: ${err?.message || err}`);
      return false;
    }
  }

  static async handleSave(
    device: Device,
    mode: 'new' | 'edit',
    tags: string[],
    onAfterSave: (d: Device, tags: string[], mode: 'edit') => void
  ): Promise<boolean> {
    const now = new Date().toISOString();
    device.meta = {
      createdAt: device.meta?.createdAt ?? now,
      updatedAt: now,
    } as any;

    try {
      const saved = await upsertDevice(device);
      const newTags = tags.includes(saved.tagNumber)
        ? tags
        : [...tags, saved.tagNumber].sort();

      onAfterSave(structuredClone(saved), newTags, 'edit');
      return true;
    } catch (err: any) {
      alert(`Gagal simpan: ${err?.message || err}`);
      return false;
    }
  }

  static async handleEditMode(
    currentTag: string,
    tags: string[],
    onLoaded: (device: Device) => void
  ) {
    const sel =
      currentTag && tags.includes(currentTag) ? currentTag : tags[0] ?? '';
    if (!sel) return;

    const found = getByTag<Device>(sel);
    if (found) {
      onLoaded(structuredClone(found));
    } else {
      const list = await loadDevices<Device>();
      const f = list.find((d) => d.tagNumber === sel);
      if (f) onLoaded(structuredClone(f));
    }
  }
}
