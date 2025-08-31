// frontend/src/pages/produksi/peternakan.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { Livestock } from '@models/livestock.model';
import type { FarmingBatch } from '@models/farming-batch.model';
import type { HarvestResult } from '@models/harvest-result.model';

import '../../components/dialogs/livestock-detail-dialog';
import '../../components/dialogs/device-dialog';
import '../../components/livestock-batch';
import '../../components/batch-result';
import 'src/views/peternakan-devices';

@customElement('peternakan-page')
export class PeternakanPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() livestockList: Livestock[] = [];
  @state() batches: FarmingBatch[] = [];
  @state() harvests: HarvestResult[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this.livestockList = await (
      await fetch('/assets/mock/livestock.json')
    ).json();
    this.batches = await (
      await fetch('/assets/mock/livestock-batches.json')
    ).json();
    this.harvests = await (
      await fetch('/assets/mock/livestock-harvests.json')
    ).json();
  }

  private handleLivestockClick(e: CustomEvent) {
    const dialogEl = document.querySelector('livestock-detail-dialog') as any;
    if (dialogEl) {
      dialogEl.livestock = e.detail;
      dialogEl.show();
    }
  }

  render() {
    const cardStyle = 'display:block;margin-top:1.5rem;margin-bottom:1.5rem;';
    return html`
      <section
        class="p-4 space-y-6"
        @livestock-click=${this.handleLivestockClick}
      >
        <h1 class="text-2xl font-bold mb-2">🐔 Produksi Peternakan</h1>

        <div>
          <h2 class="text-xl font-semibold mb-2">Kandang / Batch Aktif</h2>
          <livestock-batch
            .batches=${this.batches}
            .livestockList=${this.livestockList}
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
      </section>
    `;
  }
}
