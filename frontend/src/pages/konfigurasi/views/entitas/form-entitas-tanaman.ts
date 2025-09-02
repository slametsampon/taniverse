// frontend/src/pages/konfigurasi/views/entitas/form-entitas-tanaman.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Plant } from '@/models/plant.model';
import { plantFormFields } from '../../components/plant-fields';
import '../../components/generic-form';

@customElement('form-entitas-tanaman')
export class FormEntitasTanaman extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Partial<Plant> = {};

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
        class="border border-green-300 rounded-xl p-4 bg-green-50 shadow-sm"
      >
        <h2
          class="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2"
        >
          🪴 Jenis Tanaman
        </h2>

        <generic-form
          .fields=${plantFormFields}
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
