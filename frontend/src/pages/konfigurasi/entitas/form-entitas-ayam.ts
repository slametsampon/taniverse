// frontend/src/pages/konfigurasi/views/entitas/form-entitas-ayam.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Model & Field Definitions
import { Livestock } from '@models/livestock.model';
import { livestockFormFields } from '../schema/livestock-fields';

// Components
import 'src/components/form-builder-field';
import 'src/components/form-builder-buttons';
import { FieldConfig } from 'src/schema/field-config';

@customElement('form-entitas-ayam')
export class FormEntitasAyam extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Partial<Livestock> = {};
  @property({ type: String }) kind?: 'tanaman' | 'ikan' | 'ayam';

  @state() private draft: Record<string, any> = {};
  @state() private errors: Record<string, string> = {};

  private fields: FieldConfig[] = livestockFormFields;

  connectedCallback() {
    super.connectedCallback();
    console.log('[FORM AYAM] mounted with kind:', this.kind);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.draft = { ...this.value };
    }
  }

  private inputId(key: string) {
    return `entitas-fld-${key}`;
  }

  private handleInput(e: Event, key: string) {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const field = this.fields.find((f) => f.key === key);
    let v: any = target.value;

    if (field?.type === 'number') {
      const n = parseFloat(v);
      v = Number.isNaN(n) ? 0 : n;
    }

    this.draft = { ...this.draft, [key]: v };

    if (field?.required && (v === '' || v === null || v === undefined)) {
      this.errors = {
        ...this.errors,
        [key]: `Field "${field.label}" wajib diisi.`,
      };
    } else {
      const { [key]: _, ...rest } = this.errors;
      this.errors = rest;
    }
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

  private handleSubmit = (e?: Event) => {
    e?.preventDefault();
    e?.stopPropagation();

    const res = this.validate();
    if (!res.valid) {
      alert(res.message);
      return;
    }

    this.dispatchEvent(
      new CustomEvent<Partial<Livestock>>('submit', {
        detail: this.draft,
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleCancel = () => {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.draft = { ...this.value };
  };

  private handleDelete = () => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: {
          kind: this.kind,
          id: this.value?.id ?? this.value?.name,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  private renderField(f: FieldConfig) {
    const v = this.draft[f.key] ?? '';
    const error = this.errors[f.key];
    return html`
      <form-builder-field
        .field=${f}
        .value=${v}
        .inputId=${this.inputId(f.key)}
        .error=${error}
        .onInput=${this.handleInput.bind(this)}
      ></form-builder-field>
    `;
  }

  render() {
    return html`
      <section
        class="border border-yellow-300 rounded-xl p-4 bg-yellow-50 shadow-sm"
      >
        <h2
          class="text-xl font-semibold text-yellow-800 mb-3 flex items-center gap-2"
        >
          🐔 Jenis Ternak Ayam
        </h2>

        <form
          class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4"
          @submit=${this.handleSubmit}
        >
          ${this.fields.map((f) => this.renderField(f))}

          <div class="col-span-2">
            <form-builder-buttons
              .mode=${this.mode}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-builder-buttons>
          </div>
        </form>
      </section>
    `;
  }
}
