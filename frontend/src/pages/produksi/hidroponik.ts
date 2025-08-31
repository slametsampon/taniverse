// frontend/src/pages/produksi/hidroponik.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// import type definitions dari models
import type { Plant } from '@models/plant.model';
import type { PlantingBatch } from '@models/plant-batch.model';
import type { HarvestResult } from '@models/harvest-result.model';
import '../../components/dialogs/plant-detail-dialog'; // pastikan path sesuai
import '../../components/dialogs/device-dialog';
import '../../components/plant-batch';
import '../../components/batch-result';
import 'src/views/hidroponik-devices';

@customElement('hidroponik-page')
export class PageProduksiHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() plants: Plant[] = [];
  @state() batches: PlantingBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this.plants = await (await fetch('/assets/mock/plants.json')).json();
    this.batches = await (
      await fetch('/assets/mock/plant-batches.json')
    ).json();
    this.harvests = await (await fetch('/assets/mock/harvests.json')).json();
  }

  private handlePlantClick(e: CustomEvent) {
    const dialogEl = document.querySelector('plant-detail-dialog') as any;
    if (dialogEl) {
      dialogEl.plant = e.detail;
      dialogEl.show();
    }
  }

  render() {
    const cardStyle = 'display:block;margin-top:1.5rem;margin-bottom:1.5rem;';
    return html`
      <section class="p-4 space-y-6" @plant-click=${this.handlePlantClick}>
        <h1 class="text-2xl font-bold mb-2">🌱 Produksi Hidroponik</h1>

        <div>
          <h2 class="text-xl font-semibold mb-2">Batch Aktif</h2>
          <plant-batch
            .batches=${this.batches}
            .plants=${this.plants}
          ></plant-batch>
          <hidroponik-devices style=${cardStyle}></hidroponik-devices>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <batch-result
            .harvests=${this.harvests}
            .batches=${this.batches}
          ></batch-result>
        </div>
      </section>
    `;
  }
}
