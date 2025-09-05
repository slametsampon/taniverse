// frontend/src/pages/konfigurasi/page-config.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TabId } from 'src/types/tab-id';
import type { DeviceStateModel } from './state/device-state';
import { DeviceStateHandler } from './state/device-state';
import { DeviceEvents } from './events/device-events';

import 'src/components/ui/ui-tabs';

import { DeviceUI } from './components/device-ui';
import './components/device-mode-switch';
import './components/device-tab-content';
import './components/device-footer';
import './components/device-tab-selector';
import './components/production-tab-selector';
import './components/entitas-tab-selector';

import './views/devices/dev-config-general';
import './views/devices/dev-config-hw-comm';
import './views/devices/dev-config-loc-meta';
import './views/devices/dev-config-mqtt';

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
  @state() private batchDomain:
    | 'hidroponik'
    | 'hortikultura'
    | 'akuakultur'
    | 'peternakan' = 'hidroponik';
  @state() private tags: string[] = [];
  @state() private dirty = false;
  @state() private saving = false;
  @state() private deleting = false;
  @state() private entitasKind: 'tanaman' | 'ikan' | 'ayam' = 'tanaman';

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

  private onReset = () => {
    this.setDevice(this.pristine, this.mode);
  };

  private onBack = () => {
    if (this.dirty && !confirm('Perubahan belum disimpan. Tetap keluar?'))
      return;
    window.history.back();
  };

  private onbatchDomainChange = (e: CustomEvent<{ domain: string }>) => {
    this.batchDomain = e.detail.domain as any;
  };

  private onEntitasKindChange = (e: CustomEvent<{ kind: string }>) => {
    this.entitasKind = e.detail.kind as any;
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
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4"
              >
                <device-tab-selector
                  .selected=${this.deviceView}
                  @dev-device-view-change=${this.onDeviceViewChange}
                ></device-tab-selector>

                <device-mode-switch
                  .mode=${this.mode}
                  @dev-mode-change=${(e: CustomEvent) =>
                    this.onChangeMode(e.detail.mode)}
                ></device-mode-switch>
              </div>

              <device-tab-content
                .model=${this.device}
                .errors=${this.errorsMap}
                .tags=${this.tags}
                .mode=${this.mode}
                .activeTab=${this.deviceView}
                @dev-field-change=${this.onFieldChange}
                @dev-tag-picked=${this.onTagPicked}
              ></device-tab-content>

              <device-footer
                .saving=${this.saving}
                .deleting=${this.deleting}
                .dirty=${this.dirty}
                .errors=${this.errors.length}
                .mode=${this.mode}
                @dev-save=${this.onSave}
                @dev-reset=${this.onReset}
                @dev-delete=${this.onDelete}
                @dev-back=${this.onBack}
              ></device-footer>
            `
          : this.activeTab === 'mqtt'
          ? html`
              <device-tab-content
                .model=${this.device}
                .errors=${this.errorsMap}
                .tags=${this.tags}
                .mode=${this.mode}
                .activeTab=${'mqtt'}
                @dev-field-change=${this.onFieldChange}
                @dev-tag-picked=${this.onTagPicked}
              ></device-tab-content>
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
                <entitas-container
                  .kind=${this.entitasKind}
                ></entitas-container>
              </div>
            `
          : null}
      </section>
    `;
  }
}
