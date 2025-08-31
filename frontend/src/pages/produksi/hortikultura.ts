// frontend/src/pages/produksi/hortikultura.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// import model type definitions
import type { Plant } from '@models/plant.model';
import type { PlantingBatch } from '@models/batch.model';
import type { HarvestResult } from '@models/harvest-result.model';

import '../../components/dialogs/plant-detail-dialog';
import '../../components/dialogs/device-dialog';
import '../../components/plant-batch';
import '../../components/batch-result';
import 'src/views/hortikultura-devices';

@customElement('hortikultura-page')
export class PageProduksiHortikultura extends LitElement {
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
      await fetch('/assets/mock/horti-batches.json')
    ).json();
    this.harvests = await (
      await fetch('/assets/mock/horti-harvests.json')
    ).json();
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
        <h1 class="text-2xl font-bold mb-2">🌾 Produksi Hortikultura</h1>

        <div>
          <h2 class="text-xl font-semibold mb-2">Batch Tanam Aktif</h2>
          <plant-batch
            .batches=${this.batches}
            .plants=${this.plants}
          ></plant-batch>
          <hortikultura-devices style=${cardStyle}></hortikultura-devices>
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
