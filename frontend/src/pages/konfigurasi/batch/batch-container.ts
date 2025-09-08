// frontend/src/pages/konfigurasi/views/batch/batch-container.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { AkuakulturBatch } from '@models/akuakultur-batch.model';
import type { HidroponikBatch } from '@models/hidroponik-batch.model';
import type { HortikulturaBatch } from '@models/hortikultura-batch.model';
import type { PeternakanBatch } from '@models/peternakan-batch.model';

import './batch-list';
import './form-batch-akuakultur';
import './form-batch-hidroponik';
import './form-batch-hortikultura';
import './form-batch-peternakan';

@customElement('batch-container')
export class BatchContainer extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String })
  kind: 'akuakultur' | 'hidroponik' | 'hortikultura' | 'peternakan' =
    'akuakultur';

  @state() private view: 'list' | 'form' = 'list';
  @state() private draft: Partial<
    AkuakulturBatch | HidroponikBatch | HortikulturaBatch | PeternakanBatch
  > = {};
  @state() private mode: 'new' | 'edit' = 'new';

  // ✅ sumber data tunggal
  @state() private akuakultur: AkuakulturBatch[] = [];
  @state() private hidroponik: HidroponikBatch[] = [];
  @state() private hortikultura: HortikulturaBatch[] = [];
  @state() private peternakan: PeternakanBatch[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadAll();
  }

  private async loadAll() {
    this.akuakultur = await this.load<AkuakulturBatch[]>(
      '/assets/mock/aquatic-batches.json'
    );
    this.hidroponik = await this.load<HidroponikBatch[]>(
      '/assets/mock/hydro-batches.json'
    );
    this.hortikultura = await this.load<HortikulturaBatch[]>(
      '/assets/mock/horti-batches.json'
    );
    this.peternakan = await this.load<PeternakanBatch[]>(
      '/assets/mock/livestock-batches.json'
    );
  }
  private async load<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return res.json();
  }

  // ===== Handlers =====
  private handleAdd = (e?: CustomEvent<{ kind?: string }>) => {
    if (e?.detail?.kind)
      this.kind = e.detail.kind as
        | 'akuakultur'
        | 'hidroponik'
        | 'hortikultura'
        | 'peternakan';
    this.draft = {};
    this.mode = 'new';
    this.view = 'form';

    console.log('[ADD BATCH]', { kind: this.kind });
  };

  private handleEdit = (
    e: CustomEvent<{
      item:
        | AkuakulturBatch
        | HidroponikBatch
        | HortikulturaBatch
        | PeternakanBatch;
      kind: string;
    }>
  ) => {
    const { item, kind } = e.detail;
    this.kind = kind as
      | 'akuakultur'
      | 'hidroponik'
      | 'hortikultura'
      | 'peternakan';
    this.draft = { ...item };
    this.mode = 'edit';
    this.view = 'form';

    console.log('[EDIT BATCH]', { kind: this.kind, draft: this.draft });
  };

  private handleCancel = () => {
    this.view = 'list';
  };

  private handleSubmit = (
    e: CustomEvent<
      Partial<
        AkuakulturBatch | HidroponikBatch | HortikulturaBatch | PeternakanBatch
      >
    >
  ) => {
    console.log('[SUBMIT BATCH]', this.kind, e.detail);
    // TODO: simpan via service
    this.view = 'list';
  };

  private handleDelete = (
    e: CustomEvent<{
      id?: string;
      kind?: 'akuakultur' | 'hidroponik' | 'hortikultura' | 'peternakan';
    }>
  ) => {
    const { id, kind } = e.detail ?? {};
    if (!id || !kind) {
      console.warn('[DELETE BATCH] Event detail tidak valid:', e.detail);
      return;
    }
    console.log('[DELETE BATCH]', kind, id);

    switch (kind) {
      case 'akuakultur':
        this.akuakultur = this.akuakultur.filter(
          (b) => (b.id ?? b.code) !== id
        );
        break;
      case 'hidroponik':
        this.hidroponik = this.hidroponik.filter(
          (b) => (b.id ?? b.code) !== id
        );
        break;
      case 'hortikultura':
        this.hortikultura = this.hortikultura.filter(
          (b) => (b.id ?? b.code) !== id
        );
        break;
      case 'peternakan':
        this.peternakan = this.peternakan.filter(
          (b) => (b.id ?? b.code) !== id
        );
        break;
    }
    this.view = 'list';
  };

  // ===== Render helpers =====
  private renderForm() {
    const common = {
      mode: this.mode,
      value: this.draft,
      kind: this.kind,
      '@submit': this.handleSubmit as any,
      '@cancel': this.handleCancel as any,
      '@delete': this.handleDelete as any,
    } as any;

    console.log('[CONTAINER BATCH] common', common);
    switch (this.kind) {
      case 'akuakultur':
        return html`<form-batch-akuakultur
          .mode=${common.mode}
          .value=${common.value as Partial<AkuakulturBatch>}
          .kind=${this.kind}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></form-batch-akuakultur>`;
      case 'hidroponik':
        return html`<form-batch-hidroponik
          .mode=${common.mode}
          .value=${common.value as Partial<HidroponikBatch>}
          .kind=${this.kind}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></form-batch-hidroponik>`;
      case 'hortikultura':
        return html`<form-batch-hortikultura
          .mode=${common.mode}
          .value=${common.value as Partial<HortikulturaBatch>}
          .kind=${this.kind}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></form-batch-hortikultura>`;
      case 'peternakan':
      default:
        return html`<form-batch-peternakan
          .mode=${common.mode}
          .value=${common.value as Partial<PeternakanBatch>}
          .kind=${this.kind}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></form-batch-peternakan>`;
    }
  }

  render() {
    return html`
      ${this.view === 'list'
        ? html`
            <batch-list
              .kind=${this.kind}
              .akuakultur=${this.akuakultur}
              .hidroponik=${this.hidroponik}
              .hortikultura=${this.hortikultura}
              .peternakan=${this.peternakan}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            ></batch-list>
          `
        : this.renderForm()}
    `;
  }
}
