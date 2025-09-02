// frontend/src/pages/konfigurasi/views/entitas/entitas-list.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Plant } from '@models/plant.model';
import type { AquaticSpecies } from '@models/aquatic-species.model';
import type { Livestock } from '@models/livestock.model';

@customElement('entitas-list')
export class EntitasList extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private plants: Plant[] = [];
  @state() private fishes: AquaticSpecies[] = [];
  @state() private poultry: Livestock[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadAll();
  }

  async loadAll() {
    this.plants = await this.load<Plant[]>('/assets/mock/plants.json');
    this.fishes = await this.load<AquaticSpecies[]>(
      '/assets/mock/species.json'
    );
    this.poultry = await this.load<Livestock[]>('/assets/mock/livestock.json');
  }

  async load<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return await res.json();
  }

  private handleAdd(kind: string) {
    this.dispatchEvent(
      new CustomEvent('add-item', {
        detail: { kind },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleEdit(item: Plant | AquaticSpecies | Livestock) {
    this.dispatchEvent(
      new CustomEvent('edit-item', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderCard(title: string, emoji: string, kind: string, items: any[]) {
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

        ${items.length === 0
          ? html`<div class="text-gray-500 text-sm italic">
              Belum ada data.
            </div>`
          : html`
              <ul class="space-y-2">
                ${items.map(
                  (item) => html`
                    <li
                      class="p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                      @click=${() => this.handleEdit(item)}
                    >
                      <div class="font-medium">${item.name}</div>
                      <div class="text-sm text-gray-500">${item.id}</div>
                    </li>
                  `
                )}
              </ul>
            `}
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
