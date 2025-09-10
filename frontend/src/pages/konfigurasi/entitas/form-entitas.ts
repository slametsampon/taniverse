// frontend/src/pages/konfigurasi/entitas/form-entitas.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Models
import { Livestock } from '@models/livestock.model';
import { AquaticSpecies } from '@models/aquatic-species.model';
import { Plant } from '@models/plant.model';

// Fields
import { livestockFormFields } from '../schema/livestock-fields';
import { aquaticFormFields } from '../schema/aquatic-fields';
import { plantFormFields } from '../schema/plant-fields';

import 'src/components/form-builder-section';
import 'src/components/form-builder-buttons';
import { FieldConfig } from 'src/schema/field-config';

type KindType = 'ayam' | 'ikan' | 'tanaman';
type EntityModel = Partial<Livestock | AquaticSpecies | Plant>;

type FormSection = {
  title: string;
  desc?: string;
  fields: FieldConfig[];
};

@customElement('form-entitas')
export class FormEntitas extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: EntityModel = {};
  @property({ type: String }) kind?: KindType;

  @state() private draft: Record<string, any> = {};
  @state() private errors: Record<string, string> = {};

  protected get formTitle(): {
    icon: string;
    text: string;
    color: 'yellow' | 'blue' | 'green' | 'gray';
  } {
    switch (this.kind) {
      case 'ayam':
        return { icon: '🐔', text: 'Jenis Ternak Ayam', color: 'yellow' };
      case 'ikan':
        return { icon: '🐟', text: 'Jenis Ikan / Akuatik', color: 'blue' };
      case 'tanaman':
        return { icon: '🌱', text: 'Jenis Tanaman', color: 'green' };
      default:
        return { icon: '', text: '', color: 'gray' };
    }
  }

  protected get formSections(): FormSection[] {
    switch (this.kind) {
      case 'ayam':
        return livestockFormFields;
      case 'ikan':
        return aquaticFormFields;
      case 'tanaman':
        return plantFormFields; // ✅ FIXED
      default:
        return [];
    }
  }

  private get allFields(): FieldConfig[] {
    return this.formSections.flatMap((section) => section.fields);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('[FORM ENTITAS] mounted with kind:', this.kind);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.draft = { ...this.value };
    }
  }

  private handleFieldChange = (e: Event, key: string) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const field = this.allFields.find((f) => f.key === key);
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
  };

  private validate(): { valid: boolean; message?: string } {
    for (const f of this.allFields) {
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
      new CustomEvent<EntityModel>('submit', {
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

  render() {
    const { icon, text, color } = this.formTitle;
    const bgMap = {
      yellow: 'border-yellow-300 bg-yellow-50',
      blue: 'border-blue-300 bg-blue-50',
      green: 'border-green-300 bg-green-50',
      gray: 'border-gray-300 bg-gray-50',
    };
    const textMap = {
      yellow: 'text-yellow-800',
      blue: 'text-blue-800',
      green: 'text-green-800',
      gray: 'text-gray-800',
    };

    return html`
      <section class="border rounded-xl p-4 shadow-sm ${bgMap[color]}">
        <h2
          class="text-xl font-semibold mb-3 flex items-center gap-2 ${textMap[
            color
          ]}"
        >
          ${icon} ${text}
        </h2>

        ${this.formSections.map(
          (section) => html`
            <form-builder-section
              .title=${section.title}
              .desc=${section.desc ?? ''}
              .fields=${section.fields}
              .model=${this.draft}
              .errors=${this.errors}
              .cols=${2}
              .onFieldChange=${this.handleFieldChange}
            ></form-builder-section>
          `
        )}

        <div class="col-span-2">
          <form-builder-buttons
            .mode=${this.mode}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-builder-buttons>
        </div>
      </section>
    `;
  }
}
