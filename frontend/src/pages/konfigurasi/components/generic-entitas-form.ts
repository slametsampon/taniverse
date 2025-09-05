// frontend/src/pages/konfigurasi/components/generic-entitas-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './crud-buttons';
import { FieldConfig } from 'src/schema/field-config';

function isObjectOption(
  opt: string | { value: string; label: string }
): opt is { value: string; label: string } {
  return typeof opt !== 'string' && 'value' in opt && 'label' in opt;
}
@customElement('generic-entitas-form')
export class GenericEntitasForm extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM → Tailwind bekerja
  }

  @property({ type: Array }) fields: FieldConfig[] = [];
  @property({ type: Object }) value: Record<string, any> = {};
  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: String }) kind!: 'tanaman' | 'ikan' | 'ayam';

  @state() private draft: Record<string, any> = {};

  connectedCallback() {
    super.connectedCallback();
    console.log(
      '[GENERIC FORM] mounted with kind, mode : ',
      this.kind,
      this.mode
    );
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.draft = { ...this.value };
    }
  }

  private handleInput(e: Event, key: string) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const field = this.fields.find((f) => f.key === key);
    let v: any = target.value;

    if (field?.type === 'number') {
      const n = parseFloat(v);
      v = Number.isNaN(n) ? 0 : n;
    }

    this.draft = { ...this.draft, [key]: v };
  }

  private validate(): { valid: boolean; message?: string } {
    for (const f of this.fields) {
      const val = this.draft[f.key];
      if (f.required && (val === undefined || val === null || val === '')) {
        return { valid: false, message: `Field "${f.label}" wajib diisi.` };
      }
    }
    return { valid: true };
  }

  private handleSubmit = () => {
    const res = this.validate();
    if (!res.valid) {
      alert(res.message);
      return;
    }
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: this.draft,
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleCancel = () => {
    this.dispatchEvent(
      new CustomEvent('cancel', { bubbles: true, composed: true })
    );
    this.draft = { ...this.value };
  };

  private handleDelete = () => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      console.log('[GENERIC FORM] delete:', this.kind, this.value?.id);
      this.dispatchEvent(
        new CustomEvent('delete', {
          detail: {
            kind: this.kind,
            id: this.value?.id,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private inputId(key: string) {
    return `entitas-fld-${key}`;
  }

  private renderField(f: FieldConfig) {
    const v = this.draft[f.key] ?? '';
    const span = f.colSpan ?? 1;
    const id = this.inputId(f.key);
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

    if (f.type === 'textarea') {
      return html`
        <div class="col-span-${span}">
          <label for=${id} class="block text-sm text-gray-700 mb-1"
            >${f.label}${f.required ? ' *' : ''}</label
          >
          <textarea
            id=${id}
            class="${base} resize-none min-h-[90px]"
            .value=${v}
            ?disabled=${f.disabled ?? false}
            @input=${(e: Event) => this.handleInput(e, f.key)}
          ></textarea>
        </div>
      `;
    }

    if (f.type === 'select') {
      return html`
        <div class="col-span-${span}">
          <label for=${id} class="block text-sm text-gray-700 mb-1"
            >${f.label}${f.required ? ' *' : ''}</label
          >
          <select
            id=${id}
            class="${base}"
            .value=${String(v)}
            ?disabled=${f.disabled ?? false}
            @change=${(e: Event) => this.handleInput(e, f.key)}
          >
            <option value="">-- Pilih --</option>
            ${f.options?.map((opt) =>
              isObjectOption(opt)
                ? html`<option value=${opt.value}>${opt.label}</option>`
                : html`<option value=${opt}>${opt}</option>`
            )}
          </select>
        </div>
      `;
    }

    // Default: input type field
    const validInputTypes = [
      'text',
      'number',
      'date',
      'email',
      'password',
      'color',
      'checkbox',
      'radio',
      'file',
    ];

    const inputType = validInputTypes.includes(f.type) ? f.type : 'text'; // fallback default

    return html`
      <div class="col-span-${span}">
        <label for=${id} class="block text-sm text-gray-700 mb-1"
          >${f.label}${f.required ? ' *' : ''}</label
        >
        <input
          id=${id}
          type=${inputType}
          class="${base}"
          .value=${String(v)}
          ?required=${f.required ?? false}
          ?disabled=${f.disabled ?? false}
          @input=${(e: Event) => this.handleInput(e, f.key)}
        />
      </div>
    `;
  }

  render() {
    return html`
      <form
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4"
        @submit=${(e: Event) => {
          e.preventDefault();
          this.handleSubmit();
        }}
        @submit.capture=${(e: Event) => e.stopPropagation()}
      >
        ${this.fields.map((f) => this.renderField(f))}

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
