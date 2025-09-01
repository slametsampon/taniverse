// frontend/src/pages/produksi/hidroponik.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Plant } from '@models/plant.model';
import type { HydroponicBatch } from '@models/hydroponic-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';
import type { HarvestResult } from '@models/harvest-result.model';
import { fromHydroponicBatch } from 'src/mappers/fromHydroponicBatch';

import 'src/components/hydroponic-batch';
import 'src/components/dialogs/entity-detail-dialog';
import 'src/components/dialogs/device-dialog';
import 'src/components/batch-result';
import 'src/views/hidroponik-devices';

@customElement('hidroponik-page')
export class PageProduksiHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() plants: Plant[] = [];
  @state() batches: GenericBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const plants = (await (
      await fetch('/assets/mock/plants.json')
    ).json()) as Plant[];
    const raw = (await (
      await fetch('/assets/mock/hydro-batches.json')
    ).json()) as HydroponicBatch[];
    this.plants = plants;
    this.batches = raw.map(fromHydroponicBatch);
    this.harvests = await (await fetch('/assets/mock/harvests.json')).json();

    console.groupCollapsed('[Hidroponik] mapped GenericBatch');
    console.table(
      this.batches.map((b) => ({
        id: b.id,
        itemId: b.itemId,
        location: b.location,
      }))
    );
    console.groupEnd();
  }

  private onPlantClick = (
    e: CustomEvent<{ itemId: string; plant?: Plant }>
  ) => {
    const { itemId, plant } = e.detail;
    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show(
      { '🌱 Tanaman': plant ?? { _warn: 'not found', wantedId: itemId } },
      'Detail Tanaman'
    );
  };

  private onBatchClick = (e: CustomEvent<GenericBatch>) => {
    const batch = e.detail;
    const plant = this.plants.find((p) => p.id === batch.itemId);
    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show(
      { '📦 Batch': batch, '🌱 Tanaman': plant ?? {} },
      'Detail Batch Hidroponik'
    );
  };

  // di render:

  private handleHarvestBatchClick = (
    e: CustomEvent<{ batchId: string; batch?: GenericBatch }>
  ) => {
    const { batchId, batch } = e.detail || {};
    console.groupCollapsed('[Page] handleHarvestBatchClick');
    console.log('payload:', e.detail);
    console.groupEnd();

    const dlg = document.querySelector('entity-detail-dialog') as any;
    if (!dlg) return;

    // fallback: kalau batch belum dipetakan di props, cari manual
    const resolved = batch ?? this.batches.find((b) => b.id === batchId);
    if (!resolved) {
      dlg.show(
        { '⚠️ Info': { message: 'Batch tidak ditemukan', batchId } },
        'Detail Batch'
      );
      return;
    }

    dlg.show({ '📦 Batch': resolved }, 'Detail Batch');
  };

  render() {
    const cardStyle = 'display:block;margin-top:1.5rem;margin-bottom:1.5rem;';
    return html`
      <section class="p-4 space-y-4">
        <h1 class="text-2xl font-bold">💧 Produksi Hidroponik</h1>
        <div>
          <hydroponic-batch
            .batches=${this.batches}
            .plants=${this.plants}
            @plant-click=${this.onPlantClick}
            @batch-click=${this.onBatchClick}
          ></hydroponic-batch>
          <hidroponik-devices style=${cardStyle}></hidroponik-devices>
        </div>

        <batch-result
          .harvests=${this.harvests}
          .batches=${this.batches}
          @batch-click=${this.handleHarvestBatchClick}
        ></batch-result>

        <entity-detail-dialog></entity-detail-dialog>
      </section>
    `;
  }
}
