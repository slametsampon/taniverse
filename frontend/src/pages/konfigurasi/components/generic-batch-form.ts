// frontend/src/pages/konfigurasi/components/generic-batch-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './crud-buttons';
import { FieldConfig } from 'src/schema/field-config';

function isObjectOption(
  opt: string | { value: string; label: string }
): opt is { value: string; label: string } {
  return typeof opt !== 'string' && 'value' in opt && 'label' in opt;
}
@customElement('generic-batch-form')
export class GenericBatchForm extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM → Tailwind OK
  }

  @property({ type: Array }) fields: FieldConfig[] = [];
  @property({ type: Object }) value: Record<string, any> = {};
  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: String }) kind!:
    | 'akuakultur'
    | 'hidroponik'
    | 'hortikultura'
    | 'peternakan'; // ✅ TAMBAH

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

  private onAnySubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.handleSubmit();
  };

  private handleInput(e: Event, key: string) {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
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

  private handleSubmit() {
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
  }

  private handleCancel = () => {
    this.dispatchEvent(
      new CustomEvent('cancel', { bubbles: true, composed: true })
    );
    this.draft = { ...this.value };
  };

  private handleDelete = () => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    const id = this.value?.id ?? this.value?.code; // 🔎 fallback kalau model pakai "code"
    console.log('[GENERIC FORM] delete:', this.kind, id);
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: { kind: this.kind, id }, // ✅ KIRIM OBJEK { kind, id }
        bubbles: true,
        composed: true,
      })
    );
  };

  private inputId(key: string) {
    return `fld-${key}`;
  }

  private renderField(f: FieldConfig) {
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
    const v = this.draft[f.key] ?? '';
    const base = `${
      f.widthClass ?? 'w-full'
    } px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`;
    const span = f.colSpan ?? 1;
    const id = this.inputId(f.key);

    switch (f.type) {
      case 'textarea':
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
      case 'select':
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
      default: // text, number, date
        return html`
          <div class="col-span-${span}">
            <label for=${id} class="block text-sm text-gray-700 mb-1"
              >${f.label}${f.required ? ' *' : ''}</label
            >
            <input
              id=${id}
              type=${f.type}
              class="${base}"
              .value=${String(v)}
              ?required=${f.required ?? false}
              ?disabled=${f.disabled ?? false}
              @input=${(e: Event) => this.handleInput(e, f.key)}
            />
          </div>
        `;
    }
  }

  render() {
    return html`
      <form
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4"
        @submit=${this.onAnySubmit}
        @submit.capture=${this.onAnySubmit}
      >
        ${this.fields.map((f) => this.renderField(f))}

        <div class="col-span-2">
          <crud-buttons
            .mode=${this.mode}
            @submit=${this.onAnySubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></crud-buttons>
        </div>
      </form>
    `;
  }
}
