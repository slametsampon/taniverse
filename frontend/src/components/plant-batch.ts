// frontend/src/components/plant-batch.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PlantingBatch } from '@models/plant-batch.model';
import type { Plant } from '@models/plant.model';
import { formatDate } from '../utils/format-display';

@customElement('plant-batch')
export class PlantBatchTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: PlantingBatch[] = [];
  @property({ type: Array }) plants: Plant[] = [];

  private onPlantClick(plant: Plant | undefined) {
    const event = new CustomEvent('plant-click', {
      detail: plant,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private renderStatus(status: string) {
    const statusClass =
      {
        Aktif: 'bg-green-100 text-green-700',
        Panen: 'bg-blue-100 text-blue-700',
        Gagal: 'bg-red-100 text-red-700',
      }[status] ?? 'bg-gray-100 text-gray-700';

    return html`<span
      class="px-2 py-1 rounded text-xs font-medium ${statusClass}"
    >
      ${status}
    </span>`;
  }

  render() {
    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-green-200 text-green-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌱 Batch</th>
              <th class="px-4 py-2">🪴 Tanaman</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🌾 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">🌿 Total</th>
              <th class="px-4 py-2">📍 Lokasi</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b) => {
              const plant = this.plants.find((p) => p.id === b.plantId);
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-2 font-mono text-gray-800">${b.code}</td>
                  <td
                    class="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    @click=${() => this.onPlantClick(plant)}
                  >
                    ${plant?.name || b.plantId}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(b.startDate)}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(b.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center">${b.totalPlants}</td>
                  <td class="px-4 py-2">${b.location}</td>
                  <td class="px-4 py-2">${this.renderStatus(b.status)}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}
