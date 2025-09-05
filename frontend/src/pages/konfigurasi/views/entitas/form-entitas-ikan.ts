// frontend/src/pages/konfigurasi/views/entitas/form-entitas-ikan.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Model & Field Definitions
import { AquaticSpecies } from '@models/aquatic-species.model';
import { aquaticFormFields } from '../../schema/aquatic-fields';

// Components
import '../../components/generic-entitas-form';

@customElement('form-entitas-ikan')
export class FormEntitasIkan extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Partial<AquaticSpecies> = {};
  @property({ type: String }) kind?: 'tanaman' | 'ikan' | 'ayam';

  connectedCallback() {
    super.connectedCallback();
    console.log('[FORM IKAN] mounted with kind:', this.kind);
  }

  private handleSubmit(e: CustomEvent<Partial<AquaticSpecies>>) {
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: e.detail,
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
        detail: {
          kind: this.kind,
          id: this.value?.id,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section
        class="border border-blue-300 rounded-xl p-4 bg-blue-50 shadow-sm"
      >
        <h2
          class="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2"
        >
          🐟 Jenis Ikan / Akuatik
        </h2>

        <generic-entitas-form
          .fields=${aquaticFormFields}
          .value=${this.value}
          .mode=${this.mode}
          .kind=${this.kind}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-entitas-form>
      </section>
    `;
  }
}
