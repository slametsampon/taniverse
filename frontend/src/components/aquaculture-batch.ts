// frontend/src/components/aquaculture-batch.ts

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GenericBatch } from '@models/generic-batch.model';
import type { AquaticSpecies } from '@models/aquatic-species.model'; // kamu perlu buat model species
import { formatDate } from 'src/utils/format-display';

@customElement('aquatic-batch')
export class AquaticBatchTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: GenericBatch[] = [];
  @property({ type: Array }) species: AquaticSpecies[] = [];

  @state() private map: Record<string, AquaticSpecies> = {};

  updated(chg: Map<string, unknown>) {
    if (chg.has('species')) {
      this.map = Object.fromEntries(
        (this.species || []).map((s) => [s.id ?? (s as any).speciesId, s])
      );
    }
  }

  private onSpeciesClick(item?: AquaticSpecies, wantedId?: string) {
    this.dispatchEvent(
      new CustomEvent('species-click', {
        detail: { itemId: wantedId, item },
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
    const m = {
      Active: 'bg-green-100 text-green-700',
      Harvested: 'bg-blue-100 text-blue-700',
      Failed: 'bg-red-100 text-red-700',
    } as const;
    return html`<span
      class="px-2 py-1 rounded text-xs font-medium ${m[
        status as keyof typeof m
      ] ?? 'bg-gray-100 text-gray-700'}"
      >${status}</span
    >`;
  }

  render() {
    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-blue-100 text-blue-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🐟 Batch</th>
              <th class="px-4 py-2">🦐 Spesies</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🧺 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">👥 Populasi</th>
              <th class="px-4 py-2">🏞️ Kolam</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b) => {
              const sp = this.map[b.itemId];
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
                    @click=${() => this.onSpeciesClick(sp, b.itemId)}
                  >
                    ${sp?.name ?? b.itemId}
                  </td>
                  <td class="px-4 py-2">${formatDate(b.startDate)}</td>
                  <td class="px-4 py-2">
                    ${formatDate(b.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b.currentCount} / ${b.initialCount}
                  </td>
                  <td class="px-4 py-2">${b.location}</td>
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
