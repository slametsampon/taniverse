// frontend/src/components/batch-result.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { HarvestResult } from '@models/harvest-result.model';
import type { PlantingBatch } from '@models/plant-batch.model';

import { formatDate } from '../utils/format-display';

@customElement('batch-result')
export class HarvestResultTable extends LitElement {
  createRenderRoot() {
    return this; // Light DOM agar Tailwind aktif
  }

  @property({ type: Array }) harvests: HarvestResult[] = [];
  @property({ type: Array }) batches: PlantingBatch[] = [];

  render() {
    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-yellow-200 text-yellow-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌱 Batch</th>
              <th class="px-4 py-2">📅 Tanggal Panen</th>
              <th class="px-4 py-2 text-right">⚖️ Berat (g)</th>
              <th class="px-4 py-2 text-right">💰 Pendapatan (Rp)</th>
              <th class="px-4 py-2 text-right">📈 Laba Bersih (Rp)</th>
            </tr>
          </thead>
          <tbody>
            ${this.harvests.map((h) => {
              const batch = this.batches.find((b) => b.id === h.batchId);
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-2 font-mono text-green-700 font-semibold">
                    ${batch?.code || h.batchId}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(h.harvestDate)}
                  </td>
                  <td class="px-4 py-2 text-right text-gray-800">
                    ${h.totalWeightG.toLocaleString('id-ID')}
                  </td>
                  <td class="px-4 py-2 text-right text-green-700 font-medium">
                    Rp ${h.revenue.toLocaleString('id-ID')}
                  </td>
                  <td class="px-4 py-2 text-right text-blue-700 font-medium">
                    Rp ${h.netProfit.toLocaleString('id-ID')}
                  </td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}
