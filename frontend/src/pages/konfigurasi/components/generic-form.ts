// frontend/src/pages/konfigurasi/components/generic-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Tipe konfigurasi untuk field dinamis
export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  required?: boolean;
  disabled?: boolean;
  widthClass?: string; // ✅ Tambahkan ini
}

@customElement('generic-form')
export class GenericForm extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @property({ type: Array }) fields: FieldConfig[] = [];
  @property({ type: Object }) value: Record<string, any> = {};
  @property({ type: String }) mode: 'new' | 'edit' = 'new';

  @state() private draft: Record<string, any> = {};

  updated(changed: Map<string, any>) {
    if (changed.has('value')) {
      this.draft = { ...this.value };
    }
  }

  private handleInput(e: Event, key: string) {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === 'number' ? Number(target.value) : target.value;
    this.draft = { ...this.draft, [key]: value };
  }

  private handleSubmit() {
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: this.draft,
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  private handleDelete() {
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: this.draft.id,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <form
        @submit=${(e: Event) => {
          e.preventDefault();
          this.handleSubmit();
        }}
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
      >
        ${this.fields.map(
          (field) => html`
            <div
              class="${field.widthClass?.includes('max-w') ? 'col-span-2' : ''}"
            >
              <label class="block text-sm text-gray-700 mb-1"
                >${field.label}</label
              >
              ${field.type === 'textarea'
                ? html`<textarea
                    class="${field.widthClass ?? 'w-full'} border rounded p-2"
                    .value=${this.draft[field.key] ?? ''}
                    ?disabled=${field.disabled ?? false}
                    @input=${(e: Event) => this.handleInput(e, field.key)}
                  ></textarea>`
                : html`<input
                    type=${field.type}
                    class="${field.widthClass ??
                    'w-full'} border rounded px-2 py-1"
                    .value=${this.draft[field.key] ?? ''}
                    ?required=${field.required ?? false}
                    ?disabled=${field.disabled ?? false}
                    @input=${(e: Event) => this.handleInput(e, field.key)}
                  />`}
            </div>
          `
        )}

        <div class="flex gap-2 mt-4 col-span-2">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            💾 Simpan
          </button>
          <button
            type="button"
            @click=${this.handleCancel}
            class="px-4 py-2 rounded border"
          >
            ❌ Batal
          </button>
          ${this.mode === 'edit'
            ? html`<button
                type="button"
                @click=${this.handleDelete}
                class="px-4 py-2 rounded border text-red-600"
              >
                🗑️ Hapus
              </button>`
            : null}
        </div>
      </form>
    `;
  }
}
