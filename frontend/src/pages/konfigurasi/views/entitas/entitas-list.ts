// frontend/src/pages/konfigurasi/views/entitas/entitas-list.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Plant } from '@models/plant.model';
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { Livestock } from '@models/livestock.model';

@customElement('entitas-list')
export class EntitasList extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) kind: 'tanaman' | 'ikan' | 'ayam' = 'tanaman';

  @property({ type: Array }) plants: Plant[] = [];
  @property({ type: Array }) fishes: AquaticSpecies[] = [];
  @property({ type: Array }) poultry: Livestock[] = [];

  private handleAdd(kind: 'tanaman' | 'ikan' | 'ayam') {
    this.dispatchEvent(
      new CustomEvent('add-item', {
        detail: { kind },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleEdit(
    item: Plant | AquaticSpecies | Livestock,
    kind: 'tanaman' | 'ikan' | 'ayam'
  ) {
    this.dispatchEvent(
      new CustomEvent('edit-item', {
        detail: { item, kind },
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderCard(
    title: string,
    emoji: string,
    kind: 'tanaman' | 'ikan' | 'ayam',
    items: any[]
  ) {
    return html`
      <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">${emoji} ${title}</h3>
          <button
            class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            @click=${() => this.handleAdd(kind)}
          >
            ➕ Tambah
          </button>
        </div>
        ${items?.length
          ? html`
              <ul class="space-y-2">
                ${items.map(
                  (item: any) => html`
                    <li
                      class="p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                      @click=${() => this.handleEdit(item, kind)}
                    >
                      <div class="font-medium">${item.name}</div>
                      <div class="text-sm text-gray-500">${item.id}</div>
                    </li>
                  `
                )}
              </ul>
            `
          : html`<div class="text-gray-500 text-sm italic">
              Belum ada data.
            </div>`}
      </div>
    `;
  }

  render() {
    return html`
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${this.renderCard('Tanaman', '🌱', 'tanaman', this.plants)}
        ${this.renderCard('Ikan', '🐟', 'ikan', this.fishes)}
        ${this.renderCard('Ternak', '🐓', 'ayam', this.poultry)}
      </div>
    `;
  }
}
