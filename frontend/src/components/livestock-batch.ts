// frontend/src/components/livestock-batch.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Livestock } from '@models/livestock.model';
import type { FarmingBatch } from '@models/farming-batch.model';
import { formatDate } from '../utils/format-display';

@customElement('livestock-batch')
export class LivestockBatchTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: FarmingBatch[] = [];
  @property({ type: Array }) livestockList: Livestock[] = [];

  private getLivestockById(id: string): Livestock | undefined {
    return this.livestockList.find((l) => l.id === id);
  }

  private onLivestockClick(livestock: Livestock | undefined) {
    this.dispatchEvent(
      new CustomEvent('livestock-click', {
        detail: livestock,
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderStatus(status: string) {
    const statusClass =
      {
        Growing: 'bg-green-100 text-green-700',
        Harvested: 'bg-blue-100 text-blue-700',
        Failed: 'bg-red-100 text-red-700',
      }[status] ?? 'bg-gray-100 text-gray-700';

    return html`<span
      class="px-2 py-1 rounded text-xs font-medium ${statusClass}"
    >
      ${status}
    </span>`;
  }

  private formatLivestockInfo(l: Livestock | undefined) {
    return l
      ? html`<span class="font-medium">${l.name}</span>
          <span class="block text-xs text-gray-500">${l.breed}</span>`
      : html`<span class="italic text-gray-400">Tidak ditemukan</span>`;
  }

  render() {
    if (!this.batches.length || !this.livestockList.length) {
      return html`<p class="text-gray-500 italic">
        Tidak ada data batch peternakan.
      </p>`;
    }

    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-yellow-100 text-yellow-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🐣 Batch</th>
              <th class="px-4 py-2">🐔 Jenis Ternak</th>
              <th class="px-4 py-2">🏠 Kandang</th>
              <th class="px-4 py-2 text-center">👥 Populasi</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🌾 Estimasi Panen</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b) => {
              const l = this.getLivestockById(b.livestockId);
              console.log('Livestock:', l); // ✅ Tambahkan ini
              console.log('🔍 batch:', b); // Tambahkan log ini!
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-2 font-mono text-gray-800">${b.code}</td>
                  <td
                    class="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    @click=${() => this.onLivestockClick(l)}
                  >
                    ${this.formatLivestockInfo(l)}
                  </td>
                  <td class="px-4 py-2">${b.pen || '-'}</td>
                  <td class="px-4 py-2 text-center">
                    ${b.initialCount
                      ? `${(
                          b.currentCount ?? 0
                        ).toLocaleString()} / ${b.initialCount.toLocaleString()}`
                      : '-'}
                  </td>
                  <td class="px-4 py-2">${formatDate(b.startDate)}</td>
                  <td class="px-4 py-2">
                    ${formatDate(b.expectedHarvestDate)}
                  </td>
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
