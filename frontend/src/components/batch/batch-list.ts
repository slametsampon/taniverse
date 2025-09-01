// frontend/src/components/batch/batch-list.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { GenericBatch, BatchStatus } from '@models/generic-batch.model';
import '../dialogs/entity-detail-dialog.ts';

@customElement('batch-list')
export class BatchList extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: GenericBatch[] = [];
  @property({ type: Object }) nameMap: Record<string, string> = {};
  @property({ type: Object }) itemMap: Record<string, any> = {};

  private getStatusBadge(status: BatchStatus): string {
    const map: Record<BatchStatus, string> = {
      Active: 'bg-green-100 text-green-800',
      Harvested: 'bg-blue-100 text-blue-800',
      Failed: 'bg-red-100 text-red-800',
    };

    return map[status];
  }

  private openDetail(batch: GenericBatch) {
    const item = this.itemMap[batch.itemId] ?? {};
    const dialog = this.querySelector('entity-detail-dialog') as any;
    dialog.show(
      {
        '📦 Batch': batch,
        '🌱 Tanaman': item,
      },
      'Detail Batch & Tanaman'
    );
  }

  render() {
    if (!this.batches.length) {
      return html`<p class="italic text-gray-500">Belum ada data batch...</p>`;
    }

    return html`
      <table class="w-full text-sm border border-black rounded overflow-hidden">
        <thead class="bg-green-100 text-left">
          <tr>
            <th class="p-2">🏷️ Batch</th>
            <th class="p-2">🌱 Tanaman</th>
            <th class="p-2">📅 Mulai</th>
            <th class="p-2">🌾 Estimasi</th>
            <th class="p-2">🌿 Jumlah</th>
            <th class="p-2">📍 Lokasi</th>
            <th class="p-2">📊 Status</th>
          </tr>
        </thead>
        <tbody>
          ${this.batches.map(
            (batch) => html`
              <tr class="border-t hover:bg-gray-50">
                <td
                  class="p-2 font-mono text-blue-600 hover:underline cursor-pointer"
                  @click=${() => this.openDetail(batch)}
                >
                  ${batch.id}
                </td>
                <td
                  class="p-2 text-blue-600 font-medium hover:underline cursor-pointer"
                  @click=${() => this.openDetail(batch)}
                >
                  ${this.nameMap[batch.itemId] ?? 'Unknown'}
                </td>
                <td class="p-2">${batch.startDate}</td>
                <td class="p-2">${batch.expectedHarvestDate}</td>
                <td class="p-2 font-semibold">
                  ${batch.currentCount} / ${batch.initialCount}
                </td>
                <td class="p-2">${batch.location}</td>
                <td class="p-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-bold ${this.getStatusBadge(
                      batch.status
                    )}"
                  >
                    ${batch.status}
                  </span>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <entity-detail-dialog></entity-detail-dialog>
    `;
  }
}
