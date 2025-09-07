// frontend/src/components/form-builder-section.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FieldConfig } from 'src/schema/field-config';

@customElement('form-builder-section')
export class FormBuilderSection extends LitElement {
  createRenderRoot() {
    return this; // Light DOM: biar Tailwind bekerja
  }

  @property({ type: String }) title = '';
  @property({ type: String }) desc = '';
  @property({ type: Array }) fields: FieldConfig[] = [];
  @property({ type: Object }) model: any = {};
  @property({ type: Object }) errors: Record<string, string> = {};
  @property({ attribute: false }) onFieldChange!: (
    e: Event,
    key: string
  ) => void;
  @property({ type: Number }) cols = 2;

  private getValue(key: string): any {
    return key
      .split('.')
      .reduce((acc, part) => (acc ? acc[part] : undefined), this.model);
  }

  render() {
    return html`
      <div class="mb-6">
        ${this.title
          ? html`<h2 class="text-lg font-semibold text-gray-800 mb-2">
              ${this.title}
            </h2>`
          : null}
        ${this.desc
          ? html`<p class="text-sm text-gray-600 mb-4">${this.desc}</p>`
          : null}

        <!-- ✅ Ini grid asli, bukan lewat komponen -->
        <div class="grid grid-cols-1 sm:grid-cols-${this.cols} gap-x-4 gap-y-4">
          ${this.fields.map((field) => {
            const val = field.key ? this.getValue(field.key) : '';
            const err = field.key ? this.errors[field.key] ?? '' : '';
            const span = field.colSpan ?? 1;
            return html`
              <div class="col-span-${span}">
                <form-builder-field
                  .field=${field}
                  .value=${val}
                  .inputId=${`fld-${field.key}`}
                  .error=${err}
                  .onInput=${this.onFieldChange}
                ></form-builder-field>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
