// frontend/src/components/hydroponic-batch.ts

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GenericBatch } from '@models/generic-batch.model';
import type { Plant } from '@models/plant.model';
import { formatDate } from 'src/utils/format-display';

@customElement('hydroponic-batch')
export class HydroponicBatchTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: GenericBatch[] = [];
  @property({ type: Array }) plants: Plant[] = [];

  @state() private map: Record<string, Plant> = {};

  updated(chg: Map<string, unknown>) {
    if (chg.has('plants')) {
      this.map = Object.fromEntries((this.plants || []).map((p) => [p.id, p]));
    }
  }

  private onPlantClick(plant?: Plant, wantedId?: string) {
    this.dispatchEvent(
      new CustomEvent('plant-click', {
        detail: { itemId: wantedId, plant },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onBatchClick(batch: GenericBatch) {
    this.dispatchEvent(
      new CustomEvent('batch-click', {
        detail: batch,
        bubbles: true,
        composed: true,
      })
    );
  }

  private badge(status: string) {
    const map = {
      Active: 'bg-green-100 text-green-700',
      Harvested: 'bg-blue-100 text-blue-700',
      Failed: 'bg-red-100 text-red-700',
    } as const;
    return html`<span
      class="px-2 py-1 rounded text-xs font-medium ${map[
        status as keyof typeof map
      ] ?? 'bg-gray-100 text-gray-700'}"
      >${status}</span
    >`;
  }

  render() {
    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-emerald-100 text-emerald-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌱 Batch</th>
              <th class="px-4 py-2">🪴 Tanaman</th>
              <th class="px-4 py-2">💧 Sistem</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🌾 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">🌿 Jumlah</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b) => {
              const plant = this.map[b.itemId];
              const [system, loc] = b.location.split(' - ');
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td
                    class="px-4 py-2 font-mono text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onBatchClick(b)}
                  >
                    ${b.id}
                  </td>
                  <td
                    class="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onPlantClick(plant, b.itemId)}
                  >
                    ${plant?.name ?? b.itemId}
                  </td>
                  <td class="px-4 py-2">${system} (${loc})</td>
                  <td class="px-4 py-2">${formatDate(b.startDate)}</td>
                  <td class="px-4 py-2">
                    ${formatDate(b.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b.currentCount} / ${b.initialCount}
                  </td>
                  <td class="px-4 py-2">${this.badge(b.status)}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}
