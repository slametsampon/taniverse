// frontend/src/pages/produksi/hortikultura.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Plant } from '@models/plant.model';
import type { PlantingBatch } from '@models/plant-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';
import { fromPlantingBatch } from 'src/mappers/fromPlantingBatch';
import 'src/pages/produksi/views/hortikultura-devices';

import '../../components/plant-batch';
import '../../components/dialogs/entity-detail-dialog';
import type { HarvestResult } from '@models/harvest-result.model';
import { fetchAllPlants } from 'src/services/plant.service';
import { fetchAllHortiBatches } from 'src/services/horti-batch.service';

@customElement('hortikultura-page')
export class PageProduksiHortikultura extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() plants: Plant[] = [];
  @state() batches: GenericBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();

    const plants = (await fetchAllPlants()) as Plant[];
    const rawBatches = (await fetchAllHortiBatches()) as PlantingBatch[];

    this.plants = plants;
    this.batches = rawBatches.map(fromPlantingBatch);

    this.harvests = await (
      await fetch('./assets/mock/horti-harvests.json')
    ).json();

    // (opsional) verifikasi cepat
    console.groupCollapsed('[Horti] mapped GenericBatch');
    console.table(
      this.batches.map((b) => ({
        id: b.id,
        itemId: b.itemId,
        initial: b.initialCount,
        current: b.currentCount,
      }))
    );
    console.groupEnd();
  }

  private handlePlantClick = (e: CustomEvent<Plant | undefined>) => {
    console.groupCollapsed('[Horti] open plant dialog');
    console.log('plant payload:', e.detail);
    console.groupEnd();

    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show({ '🌱 Tanaman': e.detail ?? {} }, 'Detail Tanaman');
  };

  private handleBatchClick = (e: CustomEvent<GenericBatch>) => {
    const batch = e.detail;
    const plant = this.plants.find((p) => p.id === batch.itemId);

    console.groupCollapsed('[Horti] open batch dialog');
    console.log('batch payload:', batch);
    console.log('plant payload:', plant);
    console.groupEnd();

    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show(
      { '📦 Batch': batch, '🌱 Tanaman': plant ?? {} },
      'Detail Batch Tanam'
    );
  };

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
        <h1 class="text-2xl font-bold">🌿 Produksi Hortikultura</h1>

        <div>
          <plant-batch
            .batches=${this.batches}
            .plants=${this.plants}
            @plant-click=${this.handlePlantClick}
            @batch-click=${this.handleBatchClick}
          ></plant-batch>

          <hortikultura-devices style=${cardStyle}></hortikultura-devices>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <batch-result
            .harvests=${this.harvests}
            .batches=${this.batches}
            @batch-click=${this.handleHarvestBatchClick}
          ></batch-result>
        </div>

        <entity-detail-dialog></entity-detail-dialog>
      </section>
    `;
  }
}
