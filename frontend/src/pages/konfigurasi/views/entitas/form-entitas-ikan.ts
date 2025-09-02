// frontend/src/pages/konfigurasi/views/entitas/form-entitas-ikan.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Model & Field Definitions
import { AquaticSpecies } from '@models/aquatic-species.model';
import { aquaticFormFields } from '../../components/aquatic-fields';

// Components
import '../../components/generic-form';

@customElement('form-entitas-ikan')
export class FormEntitasIkan extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Partial<AquaticSpecies> = {};

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

  private handleDelete(e: CustomEvent<string>) {
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: e.detail,
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

        <generic-form
          .fields=${aquaticFormFields}
          .value=${this.value}
          .mode=${this.mode}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-form>
      </section>
    `;
  }
}
