// frontend/src/pages/konfigurasi/entitas/entitas-container.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { Plant } from '@models/plant.model';
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { Livestock } from '@models/livestock.model';

import { fetchAllPlants } from 'src/services/plant.service';
import { fetchAllAquaticSpecies } from 'src/services/aquatic-species.service';
import { fetchAllLivestock } from 'src/services/livestock.service';

import './entitas-list';
import './form-entitas';

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
    this.loadAll().catch((err) =>
      console.error('❌ Gagal memuat data spesies:', err)
    );
  }

  private async loadAll() {
    console.log('[LOAD ENTITAS] Memulai fetch semua data entitas...');

    try {
      console.log('[LOAD ENTITAS] → Memuat data tanaman...');
      this.plants = await fetchAllPlants();
      console.log('[LOAD ENTITAS] ✓ Data tanaman terload:', this.plants);
    } catch (err) {
      console.error('❌ Gagal memuat tanaman:', err);
    }

    try {
      console.log('[LOAD ENTITAS] → Memuat data ikan...');
      this.fishes = await fetchAllAquaticSpecies();
      console.log('[LOAD ENTITAS] ✓ Data ikan terload:', this.fishes);
    } catch (err) {
      console.error('❌ Gagal memuat ikan:', err);
    }

    try {
      console.log('[LOAD ENTITAS] → Memuat data ayam...');
      this.poultry = await fetchAllLivestock();
      console.log('[LOAD ENTITAS] ✓ Data ayam terload:', this.poultry);
    } catch (err) {
      console.error('❌ Gagal memuat ayam:', err);
    }

    console.log('[LOAD ENTITAS] Proses fetch selesai.');
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
            ></entitas-list>
          `
        : html`
            <form-entitas
              .kind=${this.kind}
              .mode=${this.mode}
              .value=${this.draft}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-entitas>
          `}
    `;
  }
}
