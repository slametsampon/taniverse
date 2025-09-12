// frontend/src/pages/konfigurasi/devices/device-config.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import 'src/components/form-builder-field';
import 'src/components/form-builder-buttons';
import 'src/components/form-builder-section';
import 'src/components/device-picker';

import { DeviceUI } from 'src/components/device-ui';
import { deviceConfigFields } from '../schema/device-config-fields';
import { DeviceStateHandler } from 'src/components/device-state-handler';
import { DeviceEvents } from '../../../components/device-events';

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  keys.slice(0, -1).forEach((k) => {
    if (!(k in current)) current[k] = {};
    current = current[k];
  });
  current[keys[keys.length - 1]] = value;
}

@customElement('device-config')
export class DeviceConfig extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @state() private model: any = {};
  @state() private errors: Record<string, string> = {};
  @state() private tags: string[] = [];
  @state() private dirty = false;
  @state() private mode: 'new' | 'edit' = 'edit';

  async connectedCallback() {
    super.connectedCallback();
    await this.loadDevicesAndInit();

    const list = await DeviceEvents.loadAllDevices();
    this.tags = list
      .map((d) => d.tagNumber)
      .filter(Boolean)
      .sort();

    const tagParam = new URL(location.href).searchParams.get('tag');
    const picked =
      tagParam && this.tags.includes(tagParam) ? tagParam : this.tags[0] ?? '';
    const found = picked ? list.find((d) => d.tagNumber === picked) : undefined;

    if (found) {
      this.setDevice(found, 'edit');
    } else {
      const fresh = DeviceStateHandler.newTemplate();
      this.setDevice(fresh, 'new');
    }
  }

  private async loadDevicesAndInit() {
    const list = await DeviceEvents.loadAllDevices();
    this.tags = list
      .map((d) => d.tagNumber)
      .filter(Boolean)
      .sort();

    const urlParams = new URL(location.href).searchParams;
    const tagParam = urlParams.get('tag');
    const picked =
      tagParam && this.tags.includes(tagParam) ? tagParam : this.tags[0] ?? '';
    const found = picked ? list.find((d) => d.tagNumber === picked) : undefined;

    if (found) {
      this.setDevice(structuredClone(found), 'edit');
    } else {
      const fresh = DeviceStateHandler.newTemplate();
      this.setDevice(fresh, 'new');
    }
  }

  private setDevice(device: any, mode: 'new' | 'edit') {
    this.model = structuredClone(device);
    this.mode = mode;
    this.revalidate();
    this.dirty = false;
  }

  private revalidate() {
    const { errors, errorsMap } = DeviceStateHandler.revalidate(
      this.model,
      this.mode === 'new'
    );
    this.errors = errorsMap;
  }

  private handleFieldChange = (e: Event, key: string) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const raw = target.value;
    const value = target.type === 'number' && raw !== '' ? Number(raw) : raw;

    setNestedValue(this.model, key, value);
    this.dirty = true;
    this.revalidate();
  };

  private handleDevicePick(e: CustomEvent) {
    const { mode, device } = e.detail;

    if (mode === 'new') {
      const fresh = DeviceStateHandler.newTemplate();
      this.setDevice(fresh, 'new');
    } else if (device) {
      this.setDevice(structuredClone(device), 'edit');
    }
  }

  private handleSave = async () => {
    this.revalidate();
    if (Object.keys(this.errors).length) return;

    const success = await DeviceEvents.handleSave(
      this.model,
      this.mode,
      this.tags,
      (saved, updatedTags, mode) => {
        this.tags = updatedTags;
        this.setDevice(saved, mode);
      }
    );
    if (success) DeviceUI.showToast('Saved ✅');
  };

  private handleDelete = async () => {
    const success = await DeviceEvents.handleDelete(
      this.model.tagNumber,
      this.tags,
      (next, mode) => {
        if (next) {
          this.setDevice(next, mode || 'edit');
          this.tags = this.tags.filter((t) => t !== this.model.tagNumber);
        } else {
          const fresh = DeviceStateHandler.newTemplate();
          this.setDevice(fresh, 'new');
          this.tags = [];
        }
      }
    );
    if (success) DeviceUI.showToast('Deleted 🗑️');
  };

  private handleCancel = () => {
    if (this.dirty && !confirm('Perubahan belum disimpan. Tetap keluar?'))
      return;
    window.history.back();
  };

  render() {
    return html`
      <div class="mb-6">
        <div class="mb-4">
          <device-picker
            .value=${this.model.tagNumber}
            @device-select=${this.handleDevicePick}
          >
          </device-picker>
        </div>

        <h2 class="text-lg font-semibold text-gray-800 mb-1">
          Konfigurasi Perangkat
        </h2>

        ${deviceConfigFields.map(
          (section) => html`
            <form-builder-section
              .title=${section.title}
              .desc=${section.desc ?? ''}
              .fields=${section.fields}
              .model=${this.model}
              .errors=${this.errors}
              .cols=${2}
              .onFieldChange=${this.handleFieldChange}
            ></form-builder-section>
          `
        )}

        <form-builder-buttons
          class="mt-4"
          .mode=${this.mode}
          @submit=${this.handleSave}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></form-builder-buttons>
      </div>
    `;
  }
}
