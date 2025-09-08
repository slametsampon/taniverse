// frontend/src/pages/konfigurasi/batch/form-batch-akuakultur.ts

import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import 'src/components/form-builder-field';
import 'src/components/form-builder-buttons';
import { FieldConfig } from 'src/schema/field-config';
import { aquaticBatchFields } from '../schema/aquatic-batch-fields';

@customElement('form-batch-akuakultur')
export class ViewProdAkuakultur extends LitElement {
  createRenderRoot() {
    return this; // Light DOM → Tailwind
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Record<string, any> = {};
  @property({ type: String }) kind!:
    | 'akuakultur'
    | 'hidroponik'
    | 'hortikultura'
    | 'peternakan';

  @state() private draft: Record<string, any> = {};
  @state() private errors: Record<string, string> = {};
  private fields: FieldConfig[] = aquaticBatchFields;

  connectedCallback() {
    super.connectedCallback();
    console.log(
      '[FORM AKUAKULTUR] mounted with kind, value :',
      this.kind,
      this.value
    );
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.draft = { ...this.value };
    }
  }

  private toggleMode(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.mode = target.value as 'new' | 'edit';

    if (this.mode === 'edit') {
      this.value = {
        id: 'AQUA-001',
        speciesId: 'LELE001',
        code: 'AQ-2025-B1',
        pond: 'Kolam-B1',
        initialPopulation: 1000,
        currentPopulation: 950,
        startDate: '2025-08-15',
        expectedHarvestDate: '2025-11-01',
        length: 400,
        width: 200,
        height: 120,
        note: 'Pertumbuhan baik, penggantian air mingguan.',
      };
    } else {
      this.value = {};
    }
  }

  private inputId(key: string) {
    return `fld-${key}`;
  }

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
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    const id = this.value?.id ?? this.value?.code;
    console.log('[FORM AKUAKULTUR] delete:', this.kind, id);
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: { kind: this.kind, id },
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
      <div class="p-4 space-y-6">
        <h2 class="text-xl font-semibold text-blue-700">
          Manajemen Batch Akuakultur
        </h2>

        <!-- Mode Switcher -->
        <div class="mb-4">
          <label class="block text-sm text-gray-700 mb-1">Mode Operasi</label>
          <select
            class="px-3 py-1 border rounded bg-white"
            .value=${this.mode}
            @change=${this.toggleMode}
          >
            <option value="new">Tambah Baru</option>
            <option value="edit">Edit Data</option>
          </select>
        </div>

        <!-- Dynamic Form -->
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
      </div>
    `;
  }
}
