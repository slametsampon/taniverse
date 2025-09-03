// frontend/src/pages/konfigurasi/views/batch/generic-batch-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GenericBatch } from '@/models/generic-batch.model';
import type { FormFieldSchema } from '@/models/form-field.schema';
import 'src/components/crud-buttons';

@customElement('generic-batch-form')
export class GenericBatchForm extends LitElement {
  createRenderRoot() {
    return this; // no shadow DOM for Tailwind compatibility
  }

  @property({ type: Array })
  schema: FormFieldSchema[] = [];

  @property({ type: Object })
  value: GenericBatch = this.emptyBatch();

  @property({ type: String })
  mode: 'new' | 'edit' = 'new';

  @state()
  private draft: GenericBatch = this.emptyBatch();

  connectedCallback() {
    super.connectedCallback();
    this.draft = { ...this.value };
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.draft = { ...this.value };
    }
  }

  private emptyBatch(): GenericBatch {
    return {
      id: '',
      itemId: '',
      location: '',
      startDate: '',
      expectedHarvestDate: '',
      initialCount: 0,
      currentCount: 0,
      status: 'Active',
      note: '',
    };
  }

  private handleChange(e: Event, key: keyof GenericBatch) {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    let value: any = target.value;

    if (['initialCount', 'currentCount'].includes(key)) {
      value = parseInt(value);
      if (isNaN(value)) value = 0;
    }

    this.draft = { ...this.draft, [key]: value };
  }

  private validate(): { valid: boolean; message?: string } {
    for (const field of this.schema) {
      if (field.required && !this.draft[field.key]) {
        return {
          valid: false,
          message: `Field "${field.label}" wajib diisi.`,
        };
      }
    }
    return { valid: true };
  }

  private onSubmit = () => {
    const result = this.validate();
    if (!result.valid) return alert(result.message);
    this.dispatchEvent(new CustomEvent('submit', { detail: this.draft }));
  };

  private onCancel = () => {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.draft = { ...this.value };
  };

  private onDelete = () => {
    if (confirm('Yakin ingin menghapus batch ini?')) {
      this.dispatchEvent(new CustomEvent('delete', { detail: this.draft.id }));
    }
  };

  private renderField(field: FormFieldSchema) {
    const value = this.draft[field.key] ?? '';

    const baseClass =
      'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition';

    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return html`
          <div class="space-y-1">
            <label class="text-sm text-gray-700 font-medium"
              >${field.label}</label
            >
            <input
              class="${baseClass} focus:ring-green-500 focus:border-green-500"
              type=${field.type}
              .value=${String(value)}
              @input=${(e: Event) => this.handleChange(e, field.key)}
            />
          </div>
        `;
      case 'textarea':
        return html`
          <div class="space-y-1">
            <label class="text-sm text-gray-700 font-medium"
              >${field.label}</label
            >
            <textarea
              class="${baseClass} resize-none min-h-[80px] focus:ring-green-500 focus:border-green-500"
              .value=${value}
              @input=${(e: Event) => this.handleChange(e, field.key)}
            ></textarea>
          </div>
        `;
      case 'select':
        return html`
          <div class="space-y-1">
            <label class="text-sm text-gray-700 font-medium"
              >${field.label}</label
            >
            <select
              class="${baseClass} focus:ring-green-500 focus:border-green-500"
              .value=${value}
              @change=${(e: Event) => this.handleChange(e, field.key)}
            >
              ${field.options?.map(
                (opt) => html`<option value=${opt}>${opt}</option>`
              )}
            </select>
          </div>
        `;
      default:
        return null;
    }
  }

  render() {
    return html`
      <div class="border rounded p-4 bg-white space-y-4 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${this.schema.map((field) => this.renderField(field))}
        </div>

        <crud-buttons
          .mode=${this.mode}
          @submit=${this.onSubmit}
          @cancel=${this.onCancel}
          @delete=${this.onDelete}
        ></crud-buttons>
      </div>
    `;
  }
}
