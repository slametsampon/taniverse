// frontend/src/components/plant-batch.ts

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GenericBatch } from '@models/generic-batch.model';
import type { Plant } from '@models/plant.model';
import { formatDate } from '../utils/format-display';

function isGenericBatch(x: any): x is GenericBatch {
  return (
    x &&
    typeof x === 'object' &&
    'itemId' in x &&
    'initialCount' in x &&
    'currentCount' in x
  );
}

@customElement('plant-batch')
export class PlantBatchTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: GenericBatch[] = [];
  @property({ type: Array }) plants: Plant[] = [];

  @state() private plantMap: Record<string, Plant> = {};

  connectedCallback() {
    super.connectedCallback();
    this.plantMap = Object.fromEntries(
      (this.plants || []).map((p) => [p.id, p])
    );
  }
  updated(changed: Map<string, unknown>) {
    if (changed.has('plants')) {
      this.plantMap = Object.fromEntries(
        (this.plants || []).map((p) => [p.id, p])
      );
    }
  }

  private onPlantClick(plant: Plant | undefined) {
    this.dispatchEvent(
      new CustomEvent('plant-click', {
        detail: plant,
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

  private renderStatus(status: string) {
    const map = {
      Active: 'bg-green-100 text-green-700',
      Harvested: 'bg-blue-100 text-blue-700',
      Failed: 'bg-red-100 text-red-700',
    } as const;
    const cls = map[status as keyof typeof map] ?? 'bg-gray-100 text-gray-700';
    return html`<span class="px-2 py-1 rounded text-xs font-medium ${cls}"
      >${status}</span
    >`;
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
              <th class="px-4 py-2 text-center">🌿 Jumlah</th>
              <th class="px-4 py-2">📍 Lokasi</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b) => {
              // aman: komponen ini mengharapkan GenericBatch
              if (!isGenericBatch(b)) {
                // tampilkan baris “invalid” agar mudah terlihat jika salah kirim tipe
                return html`
                  <tr class="bg-yellow-50">
                    <td class="px-4 py-2 font-mono text-red-600" colspan="7">
                      ⚠️ Komponen menerima tipe batch non-GenericBatch. Pastikan
                      map dengan fromPlantingBatch().
                    </td>
                  </tr>
                `;
              }
              const plant = this.plantMap[b.itemId];
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td
                    class="px-4 py-2 font-mono text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onBatchClick(b)}
                  >
                    ${b.id}
                  </td>
                  <td
                    class="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    @click=${() => this.onPlantClick(plant)}
                  >
                    ${plant?.name ?? b.itemId}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(b.startDate)}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(b.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b.currentCount} / ${b.initialCount}
                  </td>
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
