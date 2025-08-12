import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DeviceConfig } from '../domains/devices/device.model';
import {
  loadDevices,
  getByTag,
  upsertDevice,
  validateDevice,
  type ValidationError,
} from '../components/devices-config.service';

import './views/ui-tabs';
import './views/dev-config-general';
import './views/dev-config-hw-comm';
import './views/dev-config-loc-meta';

type TabId = 'general' | 'hw-comm' | 'loc-meta';
type Device = DeviceConfig<any>;

@customElement('page-device-config')
export class PageDeviceConfig extends LitElement {
  // Tailwind global → light DOM
  createRenderRoot() {
    return this;
  }

  @state() private device!: Device;
  @state() private pristine!: Device;
  @state() private errors: ValidationError[] = [];
  @state() private errorsMap: Record<string, string> = {};
  @state() private activeTab: TabId = 'general';
  @state() private mode: 'new' | 'edit' = 'new';

  private readonly TAB_KEY = 'deviceConfig.activeTab';

  async connectedCallback() {
    super.connectedCallback();
    await loadDevices();

    const url = new URL(window.location.href);
    const tag = url.searchParams.get('tag');
    const tabParam =
      (url.searchParams.get('tab') as TabId) ||
      (sessionStorage.getItem(this.TAB_KEY) as TabId) ||
      'general';
    this.activeTab = (['general', 'hw-comm', 'loc-meta'] as TabId[]).includes(
      tabParam
    )
      ? tabParam
      : 'general';

    if (tag) {
      const found = getByTag<Device>(tag);
      if (found) {
        this.mode = 'edit';
        this.device = structuredClone(found);
        this.pristine = structuredClone(found);
      }
    }
    if (!this.device) {
      const now = new Date().toISOString();
      this.mode = 'new';
      this.device = {
        tagNumber: '',
        type: 'sensor',
        description: '',
        unit: '',
        ranges: { low: 0, high: 100 },
        alarms: { low: null, high: null },
        kind: null,
        allowedStates: null,
        defaultState: null,
        writable: false,
        io: { bus: 'adc', pin: null, address: null, channel: 0 },
        mqtt: { topic: '', readCmd: null, writeCmd: null },
        sample: { periodMs: 1000, deadband: 0 },
        display: { precision: 0 },
        location: { area: '', position: '' },
        meta: { createdAt: now, updatedAt: now },
      } satisfies Device;
      this.pristine = structuredClone(this.device);
    }
    this.revalidate(false);
  }

  // events
  private onTabChange = (e: CustomEvent<{ id: TabId }>) => {
    this.activeTab = e.detail.id;
    sessionStorage.setItem(this.TAB_KEY, this.activeTab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', this.activeTab);
    history.replaceState({}, '', url.toString());
  };

  private onFieldChange = (e: CustomEvent<{ path: string; value: any }>) => {
    this.patch(this.device, e.detail.path, e.detail.value);

    // side-effects
    if (e.detail.path === 'type') {
      if (e.detail.value === 'sensor') {
        this.device.writable = false;
        this.device.allowedStates = null;
        this.device.defaultState = null;
        this.device.kind = null;
        this.device.sample ??= { periodMs: 1000, deadband: 0 };
        this.device.display ??= { precision: 0 };
      } else {
        this.device.writable = true;
        delete (this.device as any).sample;
        delete (this.device as any).display;
      }
    }
    if (e.detail.path === 'io.bus') {
      const bus = e.detail.value as string;
      if (bus === 'gpio')
        this.device.io = { bus: 'gpio', pin: 0, address: null, channel: null };
      if (bus === 'i2c')
        this.device.io = {
          bus: 'i2c',
          pin: null,
          address: '0x40',
          channel: null,
        };
      if (bus === 'adc')
        this.device.io = { bus: 'adc', pin: null, address: null, channel: 0 };
    }
    if (e.detail.path === 'allowedStatesCsv') {
      const arr = String(e.detail.value)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      this.device.allowedStates = arr.length ? arr : null;
    }

    this.revalidate(false);
    this.requestUpdate();
  };

  private onSave = () => {
    this.revalidate(true);
    if (this.errors.length) return;
    upsertDevice(this.device);
    window.history.pushState({}, '', '/#/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  private onReset = () => {
    this.device = structuredClone(this.pristine);
    this.revalidate(false);
  };
  private onBack = () => window.history.back();

  // utils
  private patch(obj: any, path: string, value: any) {
    if (path === 'allowedStatesCsv') return;

    const keys = path.split('.');
    if (!keys.length) return;

    let ref: any = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      ref[k] = { ...(ref[k] ?? {}) };
      ref = ref[k];
    }

    const leaf = keys[keys.length - 1];
    ref[leaf] = value;
  }

  private revalidate(strict: boolean) {
    const errs = validateDevice(this.device, this.mode === 'new');
    this.errors = strict ? errs : errs;
    this.errorsMap = {};
    for (const e of errs)
      if (!this.errorsMap[e.field]) this.errorsMap[e.field] = e.message;
  }
  private fieldTab(path: string): TabId {
    if (path.startsWith('io.') || path.startsWith('mqtt.')) return 'hw-comm';
    if (path.startsWith('location.') || path.startsWith('meta.'))
      return 'loc-meta';
    return 'general';
  }
  private errorsByTab(): Record<TabId, number> {
    const by: Record<TabId, number> = {
      general: 0,
      'hw-comm': 0,
      'loc-meta': 0,
    };
    for (const e of this.errors) by[this.fieldTab(e.field)]++;
    return by;
  }

  // render
  protected render() {
    if (!this.device) return null;
    const badges = this.errorsByTab();
    return html`
      <section class="max-w-6xl mx-auto">
        <ui-tabs
          .tabs=${[
            { id: 'general', label: 'General', icon: '🧾' },
            { id: 'hw-comm', label: 'H/W & Comm', icon: '🔌' },
            { id: 'loc-meta', label: 'Lokasi & Metadata', icon: '📍' },
          ] as const}
          .active=${this.activeTab}
          .badges=${badges}
          @dev-tab-change=${this.onTabChange}
        >
        </ui-tabs>

        <div class="bg-white border border-slate-200 rounded-b-md p-2 md:p-4">
          ${this.activeTab === 'general'
            ? html`
                <dev-config-general
                  .model=${this.device}
                  .errors=${this.errorsMap}
                  .mode=${this.mode}
                  @dev-field-change=${this.onFieldChange}
                >
                </dev-config-general>
              `
            : this.activeTab === 'hw-comm'
            ? html`
                <dev-config-hw-comm
                  .model=${this.device}
                  .errors=${this.errorsMap}
                  @dev-field-change=${this.onFieldChange}
                >
                </dev-config-hw-comm>
              `
            : html`
                <dev-config-loc-meta
                  .model=${this.device}
                  @dev-field-change=${this.onFieldChange}
                >
                </dev-config-loc-meta>
              `}
        </div>

        <div
          class="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-4 p-3 flex gap-3 justify-end"
        >
          <button
            class="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200"
            @click=${this.onBack}
          >
            Kembali
          </button>
          <button
            class="px-4 py-2 rounded bg-amber-100 hover:bg-amber-200"
            @click=${this.onReset}
          >
            Reset
          </button>
          <button
            class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            @click=${this.onSave}
          >
            Simpan
          </button>
        </div>
      </section>
    `;
  }
}
