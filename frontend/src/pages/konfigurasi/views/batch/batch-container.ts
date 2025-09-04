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
    return this; // ✅ Light DOM biar ikut Tailwind global
  }

  @property({ type: String })
  kind: 'akuakultur' | 'hidroponik' | 'hortikultura' | 'peternakan' =
    'akuakultur';

  @state() private view: 'list' | 'form' = 'list';
  @state() private draft: Partial<
    AkuakulturBatch | HidroponikBatch | HortikulturaBatch | PeternakanBatch
  > = {};
  @state() private mode: 'new' | 'edit' = 'new';

  // ===== Handlers =====
  private handleAdd = (e?: CustomEvent<{ kind?: string }>) => {
    if (e?.detail?.kind) {
      this.kind = e.detail.kind as typeof this.kind;
    }
    this.draft = {};
    this.mode = 'new';
    this.view = 'form';
  };

  private handleEdit = (
    e: CustomEvent<
      AkuakulturBatch | HidroponikBatch | HortikulturaBatch | PeternakanBatch
    >
  ) => {
    this.draft = { ...e.detail };
    this.mode = 'edit';
    this.view = 'form';
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
    // TODO: panggil service penyimpanan (MQTT/REST) sesuai arsitektur project
    this.view = 'list';
  };

  private handleDelete = (e: CustomEvent<string>) => {
    console.log('[DELETE BATCH]', this.kind, e.detail);
    // TODO: panggil service penghapusan
    this.view = 'list';
  };

  // ===== Render helpers =====
  private renderForm() {
    switch (this.kind) {
      case 'akuakultur':
        return html`
          <form-batch-akuakultur
            .mode=${this.mode}
            .value=${this.draft as Partial<AkuakulturBatch>}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-batch-akuakultur>
        `;
      case 'hidroponik':
        return html`
          <form-batch-hidroponik
            .mode=${this.mode}
            .value=${this.draft as Partial<HidroponikBatch>}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-batch-hidroponik>
        `;
      case 'hortikultura':
        return html`
          <form-batch-hortikultura
            .mode=${this.mode}
            .value=${this.draft as Partial<HortikulturaBatch>}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-batch-hortikultura>
        `;
      case 'peternakan':
      default:
        return html`
          <form-batch-peternakan
            .mode=${this.mode}
            .value=${this.draft as Partial<PeternakanBatch>}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-batch-peternakan>
        `;
    }
  }

  render() {
    return html`
      ${this.view === 'list'
        ? html`
            <batch-list
              .kind=${this.kind}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            ></batch-list>
          `
        : this.renderForm()}
    `;
  }
}
