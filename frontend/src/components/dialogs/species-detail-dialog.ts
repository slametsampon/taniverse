// frontend/src/components/dialogs/species-detail-dialog.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AquaticSpecies } from '@models/aquatic-species.model';
import { formatDeviceValue, formatKey } from '../../utils/format-display';

@customElement('species-detail-dialog')
export class SpeciesDetailDialog extends LitElement {
  @property({ type: Object }) species!: AquaticSpecies;
  @property({ type: Boolean }) visible = false;

  createRenderRoot() {
    return this;
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  render() {
    if (!this.visible) return html``;

    return html`
      <div
        class="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-50"
        @click=${() => this.close()}
      >
        <div
          class="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          <div class="flex justify-between items-center mb-4">
            <div class="text-lg font-bold">Detail Spesies</div>
            <button
              @click=${() => this.close()}
              class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              title="Tutup"
            >
              ✕
            </button>
          </div>

          <table class="w-full text-sm">
            <tbody>
              ${Object.entries(this.species || {}).map(
                ([key, value]) => html`
                  <tr class="border-b">
                    <td class="py-1 px-2 font-medium text-gray-600 w-1/3">
                      ${formatKey(key)}
                    </td>
                    <td class="py-1 px-2">${formatDeviceValue(value)}</td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
