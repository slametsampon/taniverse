// frontend/src/components/batch-result.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HarvestResult } from '@models/harvest-result.model';
import type { GenericBatch } from '@models/generic-batch.model';
import { formatDate } from '../utils/format-display';

// ...imports tetap

@customElement('batch-result')
export class BatchResultTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) harvests: HarvestResult[] = [];
  @property({ type: Array }) batches: GenericBatch[] = [];

  private getBatchMap(): Record<string, GenericBatch> {
    return Object.fromEntries((this.batches ?? []).map((b) => [b.id, b]));
  }

  private emitBatchClick(batchId: string, batch?: GenericBatch) {
    console.debug('[batch-result] emit batch-click', {
      batchId,
      found: !!batch,
    });
    this.dispatchEvent(
      new CustomEvent('batch-click', {
        detail: { batchId, batch }, // <-- kirim KEDUANYA
        bubbles: true,
        composed: true,
      })
    );
  }

  // ... fmtInt, fmtRp, render header tetap

  render() {
    const batchMap = this.getBatchMap();

    if (!this.harvests?.length) {
      return html`<p class="italic text-gray-500">
        Belum ada data hasil panen…
      </p>`;
    }

    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-yellow-100 text-yellow-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌿 Batch</th>
              <th class="px-4 py-2">🗓️ Tanggal Panen</th>
              <th class="px-4 py-2 text-right">⚖️ Berat (g)</th>
              <th class="px-4 py-2 text-right">🪙 Pendapatan (Rp)</th>
              <th class="px-4 py-2 text-right">📈 Laba Bersih (Rp)</th>
            </tr>
          </thead>
          <tbody>
            ${this.harvests.map((h) => {
              const batch = batchMap[h.id];
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-2">
                    <button
                      type="button"
                      class="text-blue-600 hover:underline font-semibold cursor-pointer"
                      @click=${() => this.emitBatchClick(h.batchId, batch)}
                      title="Lihat detail batch"
                    >
                      ${batch?.id ?? h.id}
                    </button>
                  </td>
                  <td class="px-4 py-2">${formatDate(h.harvestDate)}</td>
                  <td class="px-4 py-2 text-right">
                    ${this.fmtInt(h.totalWeightG)}
                  </td>
                  <td class="px-4 py-2 text-right text-green-700 font-semibold">
                    ${this.fmtRp(h.revenue)}
                  </td>
                  <td class="px-4 py-2 text-right text-blue-700 font-semibold">
                    ${this.fmtRp(h.netProfit)}
                  </td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }

  private fmtInt(n: number | undefined | null) {
    if (n === null || n === undefined || Number.isNaN(n as number)) return '—';
    return new Intl.NumberFormat('id-ID').format(n as number);
  }

  private fmtRp(n: number | undefined | null) {
    if (n === null || n === undefined || Number.isNaN(n as number)) return '—';
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(n as number);
  }
}
