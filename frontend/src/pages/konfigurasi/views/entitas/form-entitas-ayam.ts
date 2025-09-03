// frontend/src/pages/konfigurasi/views/entitas/form-entitas-ayam.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Model & Field Definitions
import { Livestock } from '@models/livestock.model';
import { livestockFormFields } from '../../schema/livestock-fields';

// Components
import '../../components/generic-entitas-form';

@customElement('form-entitas-ayam')
export class FormEntitasAyam extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Partial<Livestock> = {};

  private handleSubmit(e: CustomEvent<Partial<Livestock>>) {
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
        class="border border-yellow-300 rounded-xl p-4 bg-yellow-50 shadow-sm"
      >
        <h2
          class="text-xl font-semibold text-yellow-800 mb-3 flex items-center gap-2"
        >
          🐔 Jenis Ternak Ayam
        </h2>

        <generic-entitas-form
          .fields=${livestockFormFields}
          .value=${this.value}
          .mode=${this.mode}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-entitas-form>
      </section>
    `;
  }
}
