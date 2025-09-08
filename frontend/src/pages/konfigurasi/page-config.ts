// frontend/src/pages/konfigurasi/page-config.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TabId } from 'src/types/tab-id';
import type { DeviceStateModel } from './state/device-state';
import { DeviceStateHandler } from './state/device-state';
import { DeviceEvents } from './events/device-events';

import 'src/components/ui/ui-tabs';

import { DeviceUI } from 'src/components/device-ui';
import 'src/components/event-table';

import './views/devices/device-config';

import './views/batch/form-batch-hidroponik';
import './views/batch/form-batch-hortikultura';
import './views/batch/form-batch-akuakultur';
import './views/batch/form-batch-peternakan';

import './views/entitas/entitas-container';
import './views/batch/batch-container';

@customElement('page-config')
export class PageDeviceConfig extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @state() private device!: DeviceStateModel;
  @state() private pristine!: DeviceStateModel;
  @state() private errors: any[] = [];
  @state() private errorsMap: Record<string, string> = {};
  @state() private activeTab: TabId = 'devices';
  @state() private deviceView: 'general' | 'hw-comm' | 'loc-meta' = 'general';
  @state() private mode: 'new' | 'edit' = 'edit';
  @state() private tags: string[] = [];
  @state() private dirty = false;
  @state() private saving = false;
  @state() private deleting = false;

  private readonly TAB_KEY = 'deviceConfig.activeTab';

  async connectedCallback() {
    super.connectedCallback();

    const list = await DeviceEvents.loadAllDevices();
    this.tags = list
      .map((d) => d.tagNumber)
      .filter(Boolean)
      .sort();

    const tabParam = new URL(location.href).searchParams.get('tab') as TabId;
    this.activeTab =
      tabParam || (sessionStorage.getItem(this.TAB_KEY) as TabId) || 'devices';

    const tagParam = new URL(location.href).searchParams.get('tag');
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

  private setDevice(device: DeviceStateModel, mode: 'new' | 'edit') {
    this.device = structuredClone(device);
    this.pristine = structuredClone(device);
    this.mode = mode;
    this.revalidate();
    this.dirty = false;
  }

  private revalidate() {
    const { errors, errorsMap } = DeviceStateHandler.revalidate(
      this.device,
      this.mode === 'new'
    );
    this.errors = errors;
    this.errorsMap = errorsMap;
  }

  private onTabChange(e: CustomEvent<{ id: TabId }>) {
    this.activeTab = e.detail.id;
    sessionStorage.setItem(this.TAB_KEY, this.activeTab);
  }

  private onDeviceViewChange = (
    e: CustomEvent<{ view: 'general' | 'hw-comm' | 'loc-meta' }>
  ) => {
    this.deviceView = e.detail.view;
  };

  private onChangeMode(mode: 'edit' | 'new') {
    if (this.mode === mode) return;

    if (mode === 'edit') {
      DeviceEvents.handleEditMode(
        this.device?.tagNumber,
        this.tags,
        (loaded) => {
          this.setDevice(loaded, 'edit');
        }
      );
    } else {
      const fresh = DeviceStateHandler.newTemplate();
      this.setDevice(fresh, 'new');
    }
  }

  private onTagPicked = (e: CustomEvent<{ tag: string }>) => {
    DeviceEvents.handleTagPicked(e.detail.tag, this.tags, (dev, mode) => {
      this.setDevice(dev, mode);
    });
  };

  private onFieldChange = (e: CustomEvent<{ path: string; value: any }>) => {
    DeviceStateHandler.patch(this.device, e.detail.path, e.detail.value);
    this.dirty = true;
    this.revalidate();
  };

  private onSave = async () => {
    this.revalidate();
    if (this.errors.length) return;

    this.saving = true;
    const success = await DeviceEvents.handleSave(
      this.device,
      this.mode,
      this.tags,
      (saved, updatedTags, mode) => {
        this.tags = updatedTags;
        this.setDevice(saved, mode);
      }
    );
    this.saving = false;
    if (success) DeviceUI.showToast('Saved ✅');
  };

  private onDelete = async () => {
    this.deleting = true;
    const success = await DeviceEvents.handleDelete(
      this.device.tagNumber,
      this.tags,
      (next, mode) => {
        if (next) {
          this.setDevice(next, mode || 'edit');
          this.tags = this.tags.filter((t) => t !== this.device.tagNumber);
        } else {
          const fresh = DeviceStateHandler.newTemplate();
          this.setDevice(fresh, 'new');
          this.tags = [];
        }
      }
    );
    this.deleting = false;
    if (success) DeviceUI.showToast('Deleted 🗑️');
  };

  private onCancel = () => {
    if (this.dirty && !confirm('Perubahan belum disimpan. Tetap keluar?'))
      return;
    window.history.back();
  };

  render() {
    return html`
      <section class="max-w-6xl mx-auto px-4 py-6">
        <ui-tabs
          .tabs=${[
            { id: 'batch', label: 'Batch', icon: '🏭' },
            { id: 'entitas', label: 'Entitas', icon: '🧬' },
            { id: 'devices', label: 'Devices', icon: '🧾' },
            { id: 'mqtt', label: 'MQTT', icon: '📡' },
          ]}
          .active=${this.activeTab}
          @dev-tab-change=${this.onTabChange}
        ></ui-tabs>

        ${this.activeTab === 'devices'
          ? html`
              <device-config
                .model=${this.device}
                .errors=${this.errorsMap}
                .mode=${this.mode}
                @dev-field-change=${this.onFieldChange}
                @device-select=${this.onTagPicked}
              ></device-config>

              <form-builder-buttons
                .mode=${this.mode}
                @submit=${this.onSave}
                @cancel=${this.onCancel}
                @delete=${this.onDelete}
              ></form-builder-buttons>
            `
          : this.activeTab === 'batch'
          ? html`
              <div class="mt-4">
                <batch-container></batch-container>
              </div>
            `
          : this.activeTab === 'entitas'
          ? html`
              <div class="font-semibold text-lg mt-4 mb-2 text-gray-700">
                Konfigurasi - Entitas
              </div>
              <div class="mt-4">
                <entitas-container></entitas-container>
              </div>
            `
          : null}
      </section>
    `;
  }
}
