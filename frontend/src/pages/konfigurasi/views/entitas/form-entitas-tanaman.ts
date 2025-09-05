// frontend/src/pages/konfigurasi/views/entitas/form-entitas-tanaman.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Plant } from '@models/plant.model';
import { plantFormFields } from '../../schema/plant-fields';
import '../../components/generic-entitas-form';

@customElement('form-entitas-tanaman')
export class FormEntitasTanaman extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Partial<Plant> = {};
  @property({ type: String }) kind?: 'tanaman' | 'ikan' | 'ayam';

  connectedCallback() {
    super.connectedCallback();
    console.log('[FORM TANAMAN] mounted with kind:', this.kind);
  }

  private handleSubmit(e: CustomEvent<Partial<Plant>>) {
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
        class="border border-green-300 rounded-xl p-4 bg-green-50 shadow-sm"
      >
        <h2
          class="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2"
        >
          🌱 Jenis Tanaman
        </h2>

        <generic-entitas-form
          .fields=${plantFormFields}
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
