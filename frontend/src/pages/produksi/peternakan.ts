// frontend/src/pages/produksi/peternakan.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { Livestock } from '@models/livestock.model';
import type { LivestockBatch } from '@models/livestock-plant-batch.model';
import type { GenericBatch } from '@models/generic-batch.model';
import { fromLivestockBatch } from 'src/mappers/fromLivestockBatch';
import type { HarvestResult } from '@models/harvest-result.model';

import 'src/components/dialogs/entity-detail-dialog';
import 'src/components/dialogs/device-dialog';
import 'src/components/livestock-batch';
import 'src/components/batch-result';
import 'src/views/peternakan-devices';

@customElement('peternakan-page')
export class PeternakanPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() animals: Livestock[] = [];
  @state() livestockList: Livestock[] = [];
  @state() batches: GenericBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const animals = (await (
      await fetch('/assets/mock/livestock.json')
    ).json()) as Livestock[];
    const raw = (await (
      await fetch('/assets/mock/livestock-batches.json')
    ).json()) as LivestockBatch[];
    this.animals = animals;
    this.batches = raw.map(fromLivestockBatch);
    this.harvests = await (
      await fetch('/assets/mock/livestock-harvests.json')
    ).json();

    // (opsional) verifikasi
    console.groupCollapsed('[Peternakan] mapped GenericBatch');
    console.table(
      this.batches.map((b) => ({
        id: b.id,
        itemId: b.itemId,
        init: b.initialCount,
        curr: b.currentCount,
        status: b.status,
      }))
    );
    console.groupEnd();
  }

  private onAnimalClick = (e: CustomEvent<Livestock | undefined>) => {
    console.groupCollapsed('[Ternak] open animal dialog');
    console.log('animal payload:', e.detail);
    console.groupEnd();

    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show({ '🐮 Ternak': e.detail ?? {} }, 'Detail Ternak');
  };

  private onBatchClick = (e: CustomEvent<GenericBatch>) => {
    const batch = e.detail;
    const animal = this.animals.find((a) => a.id === batch.itemId);

    console.groupCollapsed('[Horti] open batch dialog');
    console.log('batch payload:', batch);
    console.log('plant payload:', animal);
    console.groupEnd();

    const dlg = document.querySelector('entity-detail-dialog') as any;
    dlg?.show(
      { '📦 Batch': batch, '🐮 Ternak': animal ?? {} },
      'Detail Batch Ternak'
    );
  };

  render() {
    const cardStyle = 'display:block;margin-top:1.5rem;margin-bottom:1.5rem;';
    return html`
      <section class="p-4 space-y-4">
        <h1 class="text-2xl font-bold">🐄 Produksi Peternakan</h1>

        <livestock-batch
          .batches=${this.batches}
          .livestock=${this.animals}
          @animal-click=${this.onAnimalClick}
          @batch-click=${this.onBatchClick}
        ></livestock-batch>

        <peternakan-devices style=${cardStyle}></peternakan-devices>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <batch-result
            .harvests=${this.harvests}
            .batches=${this.batches}
          ></batch-result>
        </div>
        <entity-detail-dialog></entity-detail-dialog>
       </section>
    `;
  }
}
