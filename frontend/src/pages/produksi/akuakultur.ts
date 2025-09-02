// frontend/src/pages/produksi/akuakultur.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { AquaticBatch } from '@models/aquatic-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';
import type { AquaticSpecies } from '@models/aquatic-species.model';
import { fromAquaticBatch } from 'src/mappers/fromAquaticBatch';
import type { HarvestResult } from '@models/harvest-result.model';

import 'src/components/aquaculture-batch';
import 'src/components/dialogs/entity-detail-dialog';
import 'src/views/aquakultur-devices';

@customElement('akuakultur-page')
export class PageProduksiAkuakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() species: AquaticSpecies[] = [];
  @state() batches: GenericBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const species = (await (
      await fetch('/assets/mock/species.json')
    ).json()) as AquaticSpecies[];
    const raw = (await (
      await fetch('/assets/mock/aquatic-batches.json')
    ).json()) as AquaticBatch[];
    this.harvests = await (
      await fetch('/assets/mock/aqua-harvests.json')
    ).json();

    this.species = species;
    this.batches = raw.map(fromAquaticBatch);

    console.groupCollapsed('[Akuakultur] mapped GenericBatch');
    console.table(
      this.batches.map((b) => ({
        id: b.id,
        itemId: b.itemId,
        location: b.location,
      }))
    );
    console.groupEnd();
  }

  private onSpeciesClick = (
    e: CustomEvent<{ itemId: string; item?: AquaticSpecies }>
  ) => {
    const { itemId, item } = e.detail;
    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show(
      { '🐟 Spesies': item ?? { _warn: 'not found', wantedId: itemId } },
      'Detail Spesies'
    );
  };

  private onBatchClick = (e: CustomEvent<GenericBatch>) => {
    const batch = e.detail;
    const sp = this.species.find(
      (s) => (s.id ?? (s as any).speciesId) === batch.itemId
    );
    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show(
      { '📦 Batch': batch, '🐟 Spesies': sp ?? {} },
      'Detail Batch Akuakultur'
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
        <h1 class="text-2xl font-bold">🐟 Produksi Akuakultur</h1>
        <div>
          <aquatic-batch
            .batches=${this.batches}
            .species=${this.species}
            @species-click=${this.onSpeciesClick}
            @batch-click=${this.onBatchClick}
          ></aquatic-batch>
          <aquakultur-devices style=${cardStyle}></aquakultur-devices>
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
