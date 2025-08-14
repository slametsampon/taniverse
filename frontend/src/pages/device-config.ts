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
  // Tailwind dari global, jadi pakai light DOM
  createRenderRoot() {
    return this;
  }

  /* ====== STATE ====== */
  @state() private device!: Device;
  @state() private pristine!: Device;
  @state() private errors: ValidationError[] = [];
  @state() private errorsMap: Record<string, string> = {};
  @state() private activeTab: TabId = 'general';
  @state() private mode: 'new' | 'edit' = 'edit'; // default EDIT
  @state() private tags: string[] = []; // dropdown tagnumber
  @state() private dirty = false;
  @state() private _debug = false; // HUD ?debug=1

  private readonly TAB_KEY = 'deviceConfig.activeTab';

  /* ====== LOGGER (aman meski console di-trim) ====== */
  private log(...args: any[]) {
    (window as any).__tvdbg__ = (window as any).__tvdbg__ || [];
    (window as any).__tvdbg__.push(args);
    console.warn('[page-device-config]', ...args);
  }

  /* ====== LIFECYCLE ====== */
  async connectedCallback() {
    super.connectedCallback();

    // HUD via ?debug=1
    this._debug =
      new URL(window.location.href).searchParams.get('debug') === '1';

    // cap timestamp di DOM (bukti connected)
    this.setAttribute('data-connected', new Date().toISOString());
    window.dispatchEvent(
      new CustomEvent('taniverse:cc', {
        detail: { who: 'page-device-config', ts: Date.now() },
      })
    );

    this.log('connectedCallback() CALLED | href=', location.href);

    // 1) Muat devices & isi daftar tag
    const list = await loadDevices<Device>();
    this.tags = Array.from(new Set(list.map((d) => d.tagNumber)))
      .filter(Boolean)
      .sort();
    this.log('step#1 loadDevices →', { count: list.length, tags: this.tags });

    // 2) Tentukan tab aktif
    const url = new URL(window.location.href);
    const tabParam =
      (url.searchParams.get('tab') as TabId) ||
      (sessionStorage.getItem(this.TAB_KEY) as TabId) ||
      'general';
    this.activeTab = (['general', 'hw-comm', 'loc-meta'] as TabId[]).includes(
      tabParam
    )
      ? tabParam
      : 'general';
    this.log('step#2 activeTab →', this.activeTab);

    // 3) Pilih tag awal: dari ?tag=... atau tag pertama
    const tagParam = url.searchParams.get('tag');
    const picked =
      tagParam && this.tags.includes(tagParam) ? tagParam : this.tags[0] ?? '';
    this.log(
      'step#3 picked tag →',
      picked || '(none)',
      '(from url:',
      tagParam,
      ')'
    );

    // 4) Muat device dari LIST yang baru dimuat (lebih pasti daripada cache)
    const found = picked ? list.find((d) => d.tagNumber === picked) : undefined;
    this.log(
      'step#4 found? →',
      !!found,
      found ? { tag: found.tagNumber, type: found.type } : null
    );

    if (found) {
      this.mode = 'edit';
      this.device = structuredClone(found);
      this.pristine = structuredClone(found);
      url.searchParams.set('tag', picked);
      history.replaceState({}, '', url.toString());
      this.revalidate(false);
      this.log('step#5 SET EDIT with', this.device.tagNumber);
      return;
    }

    // 5) Fallback NEW bila tidak ada data sama sekali
    this.mode = 'new';
    this.device = this.newTemplate();
    this.pristine = structuredClone(this.device);
    this.revalidate(false);
    this.log('step#5 SET NEW (no devices available)');
  }

  disconnectedCallback(): void {
    window.removeEventListener('beforeunload', this.beforeUnload);
    super.disconnectedCallback();
  }

  private beforeUnload = (e: BeforeUnloadEvent) => {
    if (!this.dirty) return;
    e.preventDefault();
    (e as unknown as { returnValue: string }).returnValue = '';
  };

  /* ====== HELPERS ====== */
  private newTemplate(): Device {
    const now = new Date().toISOString();
    return {
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
    };
  }

  private patch(obj: any, path: string, value: any) {
    if (path === 'allowedStatesCsv') return;
    const keys = path.split('.');
    let ref = obj as any;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      ref[k] = { ...(ref[k] ?? {}) };
      ref = ref[k];
    }
    ref[keys[keys.length - 1]] = value;
  }

  private revalidate(_strict: boolean) {
    const errs = validateDevice(this.device, this.mode === 'new');
    this.errors = errs;
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

  /* ====== EVENTS ====== */
  private onTabChange = (e: CustomEvent<{ id: TabId }>) => {
    this.activeTab = e.detail.id;
    sessionStorage.setItem(this.TAB_KEY, this.activeTab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', this.activeTab);
    history.replaceState({}, '', url.toString());
  };

  private onChangeMode = (mode: 'edit' | 'new') => {
    if (this.mode === mode) return;
    this.mode = mode;
    this.log('mode changed →', mode);

    if (mode === 'edit') {
      const sel =
        this.device?.tagNumber && this.tags.includes(this.device.tagNumber)
          ? this.device.tagNumber
          : this.tags[0] ?? '';
      if (!sel) {
        this.log('edit mode but no tags');
        return;
      }

      // prefer cache; kalau kosong, fallback load ulang list
      let found = getByTag<Device>(sel);
      if (!found) {
        loadDevices<Device>().then((list) => {
          const f = list.find((d) => d.tagNumber === sel);
          if (f) {
            this.device = structuredClone(f);
            this.pristine = structuredClone(f);
            this.requestUpdate();
          }
        });
      } else {
        this.device = structuredClone(found);
        this.pristine = structuredClone(found);
      }
      const u = new URL(window.location.href);
      u.searchParams.set('tag', sel);
      history.replaceState({}, '', u.toString());
    } else {
      this.device = this.newTemplate();
      this.pristine = structuredClone(this.device);
      const u = new URL(window.location.href);
      u.searchParams.delete('tag');
      history.replaceState({}, '', u.toString());
    }
    this.dirty = false;
    this.revalidate(false);
  };

  private onTagPicked = (e: CustomEvent<{ tag: string }>) => {
    const tag = e.detail.tag;
    this.log('tag picked →', tag);

    let found = getByTag<Device>(tag);
    if (!found) {
      loadDevices<Device>().then((list) => {
        const f = list.find((d) => d.tagNumber === tag);
        if (f) {
          this.mode = 'edit';
          this.device = structuredClone(f);
          this.pristine = structuredClone(f);
          this.revalidate(false);
          this.requestUpdate();
        }
      });
      return;
    }

    this.mode = 'edit';
    this.device = structuredClone(found);
    this.pristine = structuredClone(found);
    const url = new URL(window.location.href);
    url.searchParams.set('tag', tag);
    history.replaceState({}, '', url.toString());
    this.dirty = false;
    this.revalidate(false);
  };

  private onFieldChange = (e: CustomEvent<{ path: string; value: any }>) => {
    this.patch(this.device, e.detail.path, e.detail.value);

    // efek samping ringan
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

    this.dirty = true;
    this.revalidate(false);
    this.requestUpdate();
  };

  private onSave = () => {
    const wasNew = this.mode === 'new';
    this.revalidate(true);
    if (this.errors.length) {
      this.log('save blocked: validation errors', this.errors);
      return;
    }

    upsertDevice(this.device);
    this.pristine = structuredClone(this.device);
    this.dirty = false;

    if (!this.tags.includes(this.device.tagNumber)) {
      this.tags = [...this.tags, this.device.tagNumber].sort();
    }
    if (wasNew) {
      this.mode = 'edit';
      const url = new URL(window.location.href);
      url.searchParams.set('tag', this.device.tagNumber);
      history.replaceState({}, '', url.toString());
    }
    this.log('saved', this.device.tagNumber);
  };

  private onReset = () => {
    this.device = structuredClone(this.pristine);
    this.errors = [];
    this.errorsMap = {};
    this.dirty = false;
    this.log('reset to pristine');
  };

  private onBack = () => {
    if (this.dirty && !confirm('Perubahan belum disimpan. Tetap keluar?'))
      return;
    window.history.back();
  };

  /** Kelas Tailwind untuk tombol segmented control */
  private btnCls(active: boolean) {
    const base =
      'relative px-3 md:px-4 py-1.5 rounded-md text-sm font-medium ' +
      'transition-colors select-none ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';
    const on = 'bg-white text-slate-900 shadow ring-1 ring-slate-200';
    const off = 'text-slate-600 hover:text-slate-900 hover:bg-white/60';
    return `${base} ${active ? on : off}`;
  }

  /* ====== RENDER ====== */
  protected render() {
    if (!this.device) return null;
    const badges = this.errorsByTab();

    return html`
      <section class="max-w-6xl mx-auto">
        ${this._debug
          ? html` <div
              class="m-2 p-2 text-xs rounded border border-amber-300 bg-amber-50 text-amber-800"
            >
              <div>
                <b>DBG</b> mode=<code>${this.mode}</code>,
                tags=${this.tags.length}, current=<code
                  >${this.device?.tagNumber ?? '-'}</code
                >
              </div>
            </div>`
          : null}

        <!-- Mode switch: segmented control -->
        <div class="flex items-center justify-between px-2 py-3">
          <div
            class="inline-flex items-center gap-1 rounded-lg bg-slate-100/80 p-1 shadow-inner ring-1 ring-slate-200"
            role="group"
            aria-label="Switch form mode"
          >
            <!-- EDIT button -->
            <button
              class="${this.btnCls(this.mode === 'edit')}"
              aria-pressed="${this.mode === 'edit'}"
              title="Edit device yang sudah ada"
              @click=${() => this.onChangeMode('edit')}
            >
              <span class="inline-flex items-center gap-2">
                <span aria-hidden="true">✏️</span>
                <span>Edit</span>
              </span>
              ${this.mode === 'edit'
                ? html`
                    <span
                      class="absolute -bottom-1.5 left-2 right-2 h-0.5 rounded bg-indigo-500"
                    ></span>
                  `
                : null}
            </button>

            <!-- NEW button -->
            <button
              class="${this.btnCls(this.mode === 'new')}"
              aria-pressed="${this.mode === 'new'}"
              title="Buat device baru"
              @click=${() => this.onChangeMode('new')}
            >
              <span class="inline-flex items-center gap-2">
                <span aria-hidden="true">🆕</span>
                <span>New</span>
              </span>
              ${this.mode === 'new'
                ? html`
                    <span
                      class="absolute -bottom-1.5 left-2 right-2 h-0.5 rounded bg-indigo-500"
                    ></span>
                  `
                : null}
            </button>
          </div>

          <!-- status mode kecil di kanan (opsional, kesan “tech”) -->
          <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 ring-1 ring-slate-200"
            >
              <span
                class="w-1.5 h-1.5 rounded-full ${this.mode === 'edit'
                  ? 'bg-emerald-500'
                  : 'bg-indigo-500'}"
              ></span>
              Mode: <code class="font-mono">${this.mode}</code>
            </span>
          </div>
        </div>

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
                  .tags=${this.tags}
                  @dev-field-change=${this.onFieldChange}
                  @dev-tag-picked=${this.onTagPicked}
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
          class="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-4 p-3 flex gap-2 justify-end"
        >
          <button
            class="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200"
            @click=${this.onBack}
          >
            Kembali
          </button>
          <button
            class="px-3 py-2 rounded bg-amber-100 hover:bg-amber-200"
            @click=${this.onReset}
          >
            Cancel
          </button>
          <button
            class="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            @click=${this.onSave}
          >
            Save
          </button>
          ${this.dirty
            ? html`<span class="self-center text-xs text-amber-600"
                >unsaved changes…</span
              >`
            : null}
        </div>
      </section>
    `;
  }
}
