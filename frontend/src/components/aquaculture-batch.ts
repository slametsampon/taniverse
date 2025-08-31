// frontend/src/components/aquaculture-batch.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AquacultureBatch } from '@models/aquaculture-batch.model';
import type { AquaticSpecies } from '@models/aquatic-species.model';

@customElement('aquaculture-batch')
export class AquacultureBatchTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) batches: AquacultureBatch[] = [];
  @property({ type: Array }) species: AquaticSpecies[] = [];

  private getSpeciesById(id: string): AquaticSpecies | undefined {
    return this.species.find((s) => s.id === id);
  }

  private onSpeciesClick(species: AquaticSpecies | undefined) {
    const event = new CustomEvent('species-click', {
      detail: species,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
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

  render() {
    if (!this.batches.length || !this.species.length) {
      return html`<p class="text-gray-500 italic">
        Tidak ada batch akuakultur saat ini.
      </p>`;
    }

    return html`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-blue-200 text-blue-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2"># Batch</th>
              <th class="px-4 py-2">🐟 Spesies</th>
              <th class="px-4 py-2">⚙️ Sistem</th>
              <th class="px-4 py-2 text-center">👥 Populasi</th>
              <th class="px-4 py-2">📍 Kolam</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((batch) => {
              const sp = this.getSpeciesById(batch.speciesId);
              return html`
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-2 font-mono text-gray-800">
                    ${batch.code}
                  </td>
                  <td
                    class="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    @click=${() => this.onSpeciesClick(sp)}
                  >
                    ${sp?.name || batch.speciesId}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${sp?.systemType || '-'}
                  </td>
                  <td class="px-4 py-2 text-center">
                    ${batch.currentPopulation} / ${batch.initialPopulation}
                  </td>
                  <td class="px-4 py-2">${batch.pond}</td>
                  <td class="px-4 py-2">${this.renderStatus(batch.status)}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}
