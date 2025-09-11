// frontend/src/pages/konfigurasi/batch/batch-container.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { AquaticBatch } from '@models/aquatic-batch.model';
import type { HydroponicBatch } from '@models/hidroponic-batch.model';
import type { HortiBatch } from '@models/horti-batch.model';
import type { LivestockBatch } from '@models/livestock-batch.model';

import {
  fetchAllAquaticBatches,
  fetchAllHydroponicBatches,
  fetchAllHortiBatches,
  fetchAllLivestockBatches,
} from 'src/services/all-batch-services';

import './form-batch';
import './batch-list';

type BatchKind = 'akuakultur' | 'hidroponik' | 'hortikultura' | 'peternakan';
type BatchModel = Partial<
  AquaticBatch | HydroponicBatch | HortiBatch | LivestockBatch
>;

@customElement('batch-container')
export class BatchContainer extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) kind: BatchKind = 'akuakultur';

  @state() private view: 'list' | 'form' = 'list';
  @state() private draft: BatchModel = {};
  @state() private mode: 'new' | 'edit' = 'new';

  @state() private aquatic: AquaticBatch[] = [];
  @state() private hydroponic: HydroponicBatch[] = [];
  @state() private horti: HortiBatch[] = [];
  @state() private livestock: LivestockBatch[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadAll().catch(console.error);
  }

  private async loadAll() {
    console.log('[LOAD BATCH] Fetch semua data...');

    try {
      this.aquatic = await fetchAllAquaticBatches();
      console.log('✓ Akuakultur loaded:', this.aquatic);
    } catch (e) {
      console.error('❌ Gagal memuat akuakultur:', e);
    }

    try {
      this.hydroponic = await fetchAllHydroponicBatches();
      console.log('✓ Hidroponik loaded:', this.hydroponic);
    } catch (e) {
      console.error('❌ Gagal memuat hidroponik:', e);
    }

    try {
      this.horti = await fetchAllHortiBatches();
      console.log('✓ Hortikultura loaded:', this.horti);
    } catch (e) {
      console.error('❌ Gagal memuat hortikultura:', e);
    }

    try {
      this.livestock = await fetchAllLivestockBatches();
      console.log('✓ Peternakan loaded:', this.livestock);
    } catch (e) {
      console.error('❌ Gagal memuat peternakan:', e);
    }
  }

  private handleAdd = (e: CustomEvent<{ kind: BatchKind }>) => {
    this.kind = e.detail.kind;
    this.draft = {};
    this.mode = 'new';
    this.view = 'form';

    console.log('[ADD BATCH]', { kind: this.kind });
  };

  private handleEdit = (
    e: CustomEvent<{ item: BatchModel; kind: BatchKind }>
  ) => {
    this.kind = e.detail.kind;
    this.draft = { ...e.detail.item };
    this.mode = 'edit';
    this.view = 'form';

    console.log('[EDIT BATCH]', { kind: this.kind, draft: this.draft });
  };

  private handleSubmit = (e: CustomEvent<BatchModel>) => {
    console.log('[SUBMIT BATCH]', { kind: this.kind, data: e.detail });
    this.view = 'list';
  };

  private handleDelete = (
    e: CustomEvent<{ id?: string; kind?: BatchKind }>
  ) => {
    const { id, kind } = e.detail ?? {};

    if (!id || !kind) {
      console.warn('[DELETE BATCH] Event detail tidak valid:', e.detail);
      return;
    }

    console.log('[DELETE BATCH]', { kind, id });

    switch (kind) {
      case 'akuakultur':
        this.aquatic = this.aquatic.filter((item) => item.id !== id);
        break;
      case 'hidroponik':
        this.hydroponic = this.hydroponic.filter((item) => item.id !== id);
        break;
      case 'hortikultura':
        this.horti = this.horti.filter((item) => item.id !== id);
        break;
      case 'peternakan':
        this.livestock = this.livestock.filter((item) => item.id !== id);
        break;
    }

    this.view = 'list';
  };

  private handleCancel = () => {
    this.view = 'list';
  };

  render() {
    return html`
      ${this.view === 'list'
        ? html`
            <batch-list
              .kind=${this.kind}
              .akuakultur=${this.aquatic}
              .hidroponik=${this.hydroponic}
              .hortikultura=${this.horti}
              .peternakan=${this.livestock}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            ></batch-list>
          `
        : html`
            <form-batch
              .kind=${this.kind}
              .mode=${this.mode}
              .value=${this.draft}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-batch>
          `}
    `;
  }
}
