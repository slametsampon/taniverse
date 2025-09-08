// frontend/src/pages/konfigurasi/devices/device-config.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import 'src/components/form-builder-field';
import { deviceConfigFields } from '../schema/device-config-fields'; // 🆕 pastikan file ini ada
import 'src/components/form-builder-section';
import 'src/components/device-picker';

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
  @state() model: any = {};
  @property({ type: Object }) errors: Record<string, string> = {};
  @property({ type: String }) mode: 'new' | 'edit' = 'edit';

  createRenderRoot() {
    return this; // ✅ Light DOM supaya Tailwind berfungsi
  }

  private handleFieldChange = (e: Event, key: string) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const raw = target.value;
    const value = target.type === 'number' && raw !== '' ? Number(raw) : raw;

    setNestedValue(this.model, key, value);

    this.dispatchEvent(
      new CustomEvent('dev-field-change', {
        detail: { path: key, value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleDevicePick(e: CustomEvent) {
    const { mode, device } = e.detail;

    this.mode = mode;
    console.log('[device-config] Received device-select event:', e.detail);

    if (mode === 'new') {
      this.model = {};
      console.log('[device-picker] Mode: new → Reset form model:', this.model);
    } else if (device) {
      this.model = structuredClone(device);
      console.log('[device-picker] Mode: edit → Loaded device:', this.model);
    }

    // Tambahan log (opsional) untuk validasi apakah model berubah
    requestAnimationFrame(() => {
      console.log('[form-builder] Current model after update:', this.model);
    });
  }

  @state()
  private devices: any[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const res = await fetch('/assets/mock/devices.json');
    this.devices = await res.json();
  }

  render() {
    return html`
      <div class="mb-6">
        <div class="mb-4">
          <device-picker
            .value=${this.model.tagNumber}
            @device-select=${this.handleDevicePick} >
          </device-picker>
        </div>
        <h2 class="text-lg font-semibold text-gray-800 mb-1">${this.title}</h2>
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
        </div>
      </div>
    `;
  }
}
