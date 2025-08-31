// frontend/src/pages/produksi/akuakultur.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// import type definitions dari models
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { AquacultureBatch } from '@models/aquaculture-batch.model';
import type { HarvestResult } from '@models/harvest-result.model';

import '../../components/dialogs/species-detail-dialog';
import '../../components/dialogs/device-dialog';
import '../../components/aquaculture-batch';
import '../../components/batch-result';
import 'src/views/aquakultur-devices';

@customElement('akuakultur-page')
export class PageProduksiAkuakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() species: AquaticSpecies[] = [];
  @state() batches: AquacultureBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this.species = await (await fetch('/assets/mock/species.json')).json();
    this.batches = await (await fetch('/assets/mock/aqua-batches.json')).json();
    this.harvests = await (
      await fetch('/assets/mock/aqua-harvests.json')
    ).json();
  }

  private handleSpeciesClick(e: CustomEvent) {
    const dialogEl = document.querySelector('species-detail-dialog') as any;
    if (dialogEl) {
      dialogEl.species = e.detail;
      dialogEl.show();
    }
  }

  render() {
    const cardStyle = 'display:block;margin-top:1.5rem;margin-bottom:1.5rem;';
    return html`
      <section class="p-4 space-y-6" @species-click=${this.handleSpeciesClick}>
        <h1 class="text-2xl font-bold mb-2">🐟 Produksi Akuakultur</h1>

        <div>
          <h2 class="text-xl font-semibold mb-2">Kolam / Batch Aktif</h2>
          <aquaculture-batch
            .batches=${this.batches}
            .species=${this.species}
          ></aquaculture-batch>
          <aquakultur-devices style=${cardStyle}></aquakultur-devices>
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
