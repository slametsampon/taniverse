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
  @state() private plants: Plant[] = [];
  @state() private fishes: AquaticSpecies[] = [];
  @state() private poultry: Livestock[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadAll(); // sekali saja saat mount
  }

  private async loadAll() {
    this.plants = await this.load<Plant[]>('/assets/mock/plants.json');
    this.fishes = await this.load<AquaticSpecies[]>(
      '/assets/mock/species.json'
    );
    this.poultry = await this.load<Livestock[]>('/assets/mock/livestock.json');
  }

  private async load<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return res.json();
  }

  private handleAdd = (
    e: CustomEvent<{ kind: 'tanaman' | 'ikan' | 'ayam' }>
  ) => {
    this.kind = e.detail.kind;
    this.draft = {};
    this.mode = 'new';
    this.view = 'form';

    console.log('[ADD ENTITAS]', { kind: this.kind });
  };

  private handleSubmit = (
    e: CustomEvent<Partial<Plant | AquaticSpecies | Livestock>>
  ) => {
    console.log('[SUBMIT ENTITAS]', { kind: this.kind, data: e.detail });
    this.view = 'list';
  };

  private handleDelete = (
    e: CustomEvent<{ id?: string; kind?: 'tanaman' | 'ikan' | 'ayam' }>
  ) => {
    const { id, kind } = e.detail ?? {};

    if (!id || !kind) {
      console.warn('[DELETE ENTITAS] Event detail tidak valid:', e.detail);
      return;
    }

    console.log('[DELETE ENTITAS]', { kind, id });

    switch (kind) {
      case 'tanaman':
        this.plants = this.plants.filter((item) => item.id !== id);
        break;
      case 'ikan':
        this.fishes = this.fishes.filter((item) => item.id !== id);
        break;
      case 'ayam':
        this.poultry = this.poultry.filter((item) => item.id !== id);
        break;
    }

    this.view = 'list';
  };

  private handleEdit = (
    e: CustomEvent<{ item: Plant | AquaticSpecies | Livestock; kind: string }>
  ) => {
    const { item, kind } = e.detail;
    this.kind = kind as 'tanaman' | 'ikan' | 'ayam';
    this.draft = { ...item };
    this.mode = 'edit';
    this.view = 'form';

    console.log('[EDIT ENTITAS]', { kind: this.kind, draft: this.draft });
  };

  private handleCancel = () => {
    this.view = 'list';
  };

  render() {
    return html`
      ${this.view === 'list'
        ? html`
            <entitas-list
              .kind=${this.kind}
              .plants=${this.plants}
              .fishes=${this.fishes}
              .poultry=${this.poultry}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            >
            </entitas-list>
          `
        : this.kind === 'tanaman'
        ? html`
            <form-entitas-tanaman
              .kind=${this.kind}
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
              .kind=${this.kind}
              .mode=${this.mode}
              .value=${this.draft as Partial<AquaticSpecies>}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-entitas-ikan>
          `
        : html`
            <form-entitas-ayam
              .kind=${this.kind}
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
