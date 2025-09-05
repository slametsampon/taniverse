// frontend/src/components/form-builder-field.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FieldConfig } from 'src/schema/field-config';

function isObjectOption(
  opt: string | { value: string; label: string }
): opt is { value: string; label: string } {
  return typeof opt !== 'string' && 'value' in opt && 'label' in opt;
}

@customElement('form-builder-field')
export class FormBuilder extends LitElement {
  createRenderRoot() {
    return this; // Light DOM → Tailwind OK
  }

  @property({ type: Object }) field!: FieldConfig;
  @property({ type: String }) value: any = '';
  @property({ type: String }) inputId = '';
  @property({ type: Function }) onInput!: (e: Event, key: string) => void;
  @property({ type: String }) error: string = '';

  render() {
    const f = this.field;
    const span = f.colSpan ?? 1;
    const base = `${
      f.widthClass ?? 'w-full'
    } px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`;

    if (f.type === 'separator') {
      return html`
        <div class="col-span-2 border-b border-gray-300 mt-2 mb-1">
          ${f.label
            ? html`<h3 class="text-sm font-semibold text-gray-600 mb-1">
                ${f.label}
              </h3>`
            : null}
        </div>
      `;
    }

    const errorHtml = this.error
      ? html`<p class="text-sm text-red-600 mt-1">${this.error}</p>`
      : null;

    switch (f.type) {
      case 'textarea':
        return html`
          <div class="col-span-${span}">
            <label for=${this.inputId} class="block text-sm text-gray-700 mb-1">
              ${f.label}${f.required ? ' *' : ''}
            </label>
            <textarea
              id=${this.inputId}
              class="${base} resize-none min-h-[90px]"
              .value=${this.value}
              ?disabled=${f.disabled ?? false}
              @input=${(e: Event) => this.onInput(e, f.key)}
            ></textarea>
            ${errorHtml}
          </div>
        `;
      case 'select':
        return html`
          <div class="col-span-${span}">
            <label for=${this.inputId} class="block text-sm text-gray-700 mb-1">
              ${f.label}${f.required ? ' *' : ''}
            </label>
            <select
              id=${this.inputId}
              class="${base}"
              .value=${String(this.value)}
              ?disabled=${f.disabled ?? false}
              @change=${(e: Event) => this.onInput(e, f.key)}
            >
              <option value="">-- Pilih --</option>
              ${f.options?.map((opt) =>
                isObjectOption(opt)
                  ? html`<option value=${opt.value}>${opt.label}</option>`
                  : html`<option value=${opt}>${opt}</option>`
              )}
            </select>
            ${errorHtml}
          </div>
        `;
      default: // text, number, date
        return html`
          <div class="col-span-${span}">
            <label for=${this.inputId} class="block text-sm text-gray-700 mb-1">
              ${f.label}${f.required ? ' *' : ''}
            </label>
            <input
              id=${this.inputId}
              type=${f.type}
              class="${base}"
              .value=${String(this.value)}
              ?required=${f.required ?? false}
              ?disabled=${f.disabled ?? false}
              @input=${(e: Event) => this.onInput(e, f.key)}
            />
            ${errorHtml}
          </div>
        `;
    }
  }
}
