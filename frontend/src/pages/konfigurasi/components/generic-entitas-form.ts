// frontend/src/pages/konfigurasi/components/generic-entitas-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './crud-buttons';
import { FieldConfig } from '../schema/field-config';

@customElement('generic-entitas-form')
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
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4"
      >
        ${this.fields.map((field) => {
          // 🔻 Separator logic
          if (field.type === 'separator') {
            return html`
              <div class="col-span-2 border-b border-gray-300 mt-2 mb-1">
                ${field.label
                  ? html`<h3 class="text-sm font-semibold text-gray-600 mb-1">
                      ${field.label}
                    </h3>`
                  : null}
              </div>
            `;
          }

          // 🔻 Normal field
          return html`
            <div class="col-span-${field.colSpan ?? 1}">
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
          `;
        })}

        <div class="col-span-2">
          <crud-buttons
            .mode=${this.mode}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></crud-buttons>
        </div>
      </form>
    `;
  }
}
