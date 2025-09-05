// frontend/src/pages/konfigurasi/views/devices/dev-config-general-fb.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import 'src/components/form-builder-field';
import { generalFields } from '../../schema/dev-config-general-fields-fb'; // 🆕 pastikan file ini ada

function getNestedValue(obj: any, path: string): any {
  return path
    .split('.')
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  keys.slice(0, -1).forEach((k) => {
    if (!(k in current)) current[k] = {};
    current = current[k];
  });
  current[keys[keys.length - 1]] = value;
}

@customElement('dev-config-general-fb')
export class DevConfigGeneralFb extends LitElement {
  @property({ type: Object }) model!: any;
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

  render() {
    return html`
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Informasi Umum</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          ${generalFields.map((field) => {
            const val = getNestedValue(this.model, field.key);
            const err = getNestedValue(this.errors, field.key) ?? '';
            const span = field.colSpan ?? 1;

            return html`
              <div class="col-span-${span}">
                <form-builder-field
                  .field=${field}
                  .value=${val}
                  .inputId=${`fld-${field.key}`}
                  .error=${err}
                  .onInput=${this.handleFieldChange}
                ></form-builder-field>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
