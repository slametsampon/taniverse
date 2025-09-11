// frontend/src/components/device-events.ts

// frontend/src/components/DeviceEvents.ts

import { DeviceUI } from './device-ui';
import { DeviceStateHandler } from './device-state-handler';
import { getByTag } from 'src/services/devices-config.service';

export class DeviceEvents {
  static async loadAllDevices(): Promise<any[]> {
    const res = await fetch('/api/devices'); // or MQTT if real-time
    const json = await res.json();
    return json;
  }

  static async handleSave(
    model: any,
    mode: 'new' | 'edit',
    tags: string[],
    onSuccess: (saved: any, updatedTags: string[], mode: 'new' | 'edit') => void
  ): Promise<boolean> {
    try {
      const res = await fetch('/api/devices', {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model),
      });
      const saved = await res.json();
      const updatedTags = [...new Set([...tags, saved.tagNumber])];
      onSuccess(saved, updatedTags, 'edit');
      return true;
    } catch (err) {
      DeviceUI.showToast('Gagal menyimpan', true);
      return false;
    }
  }

  static async handleDelete(
    tag: string,
    tags: string[],
    onSuccess: (next?: any, mode?: 'edit' | 'new') => void
  ): Promise<boolean> {
    try {
      await fetch(`/api/devices/${tag}`, { method: 'DELETE' });
      const updatedTags = tags.filter((t) => t !== tag);
      const list = await this.loadAllDevices();
      const next = list[0];
      onSuccess(next, next ? 'edit' : 'new');
      return true;
    } catch (err) {
      DeviceUI.showToast('Gagal menghapus', true);
      return false;
    }
  }

  static handleTagPicked(
    tag: string,
    tags: string[],
    cb: (device: any, mode: 'edit' | 'new') => void
  ) {
    const found = tags.includes(tag) ? getByTag(tag) : undefined;
    if (found) cb(found, 'edit');
    else cb(DeviceStateHandler.newTemplate(), 'new');
  }
}
