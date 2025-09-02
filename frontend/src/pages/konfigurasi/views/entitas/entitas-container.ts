// frontend/src/pages/konfigurasi/views/entitas/entitas-container.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { Plant } from '@models/plant.model';
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { Livestock } from '@models/livestock.model';

import './entitas-list';
import './form-entitas-tanaman';
import './form-entitas-ikan';
import './form-entitas-ayam';

@customElement('entitas-container')
export class EntitasContainer extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @property({ type: String }) kind: 'tanaman' | 'ikan' | 'ayam' = 'tanaman';

  @state() private view: 'list' | 'form' = 'list';
  @state() private draft: Partial<Plant | AquaticSpecies | Livestock> = {};
  @state() private mode: 'new' | 'edit' = 'new';

  private handleAdd = () => {
    this.draft = {};
    this.mode = 'new';
    this.view = 'form';
  };

  private handleEdit = (e: CustomEvent<Plant | AquaticSpecies | Livestock>) => {
    this.draft = { ...e.detail };
    this.mode = 'edit';
    this.view = 'form';
  };

  private handleCancel = () => {
    this.view = 'list';
  };

  private handleSubmit = (
    e: CustomEvent<Partial<Plant | AquaticSpecies | Livestock>>
  ) => {
    console.log('[SUBMIT]', e.detail);
    this.view = 'list';
  };

  private handleDelete = (e: CustomEvent<string>) => {
    console.log('[DELETE]', e.detail);
    this.view = 'list';
  };

  render() {
    return html`
      ${this.view === 'list'
        ? html`
            <entitas-list
              .kind=${this.kind}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            ></entitas-list>
          `
        : this.kind === 'tanaman'
        ? html`
            <form-entitas-tanaman
              .mode=${this.mode}
              .value=${this.draft as Partial<Plant>}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-entitas-tanaman>
          `
        : this.kind === 'ikan'
        ? html`
            <form-entitas-ikan
              .mode=${this.mode}
              .value=${this.draft as Partial<AquaticSpecies>}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-entitas-ikan>
          `
        : html`
            <form-entitas-ayam
              .mode=${this.mode}
              .value=${this.draft as Partial<Livestock>}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-entitas-ayam>
          `}
    `;
  }
}
