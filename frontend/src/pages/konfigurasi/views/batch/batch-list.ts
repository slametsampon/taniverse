// frontend/src/pages/konfigurasi/views/batch/batch-list.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { AkuakulturBatch } from '@models/akuakultur-batch.model';
import type { HidroponikBatch } from '@models/hidroponik-batch.model';
import type { HortikulturaBatch } from '@models/hortikultura-batch.model';
import type { PeternakanBatch } from '@models/peternakan-batch.model';

@customElement('batch-list')
export class BatchList extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM agar ikut Tailwind global
  }

  @property({ type: String })
  kind: 'akuakultur' | 'hidroponik' | 'hortikultura' | 'peternakan' =
    'akuakultur';

  @state() private akuakultur: AkuakulturBatch[] = [];
  @state() private hidroponik: HidroponikBatch[] = [];
  @state() private hortikultura: HortikulturaBatch[] = [];
  @state() private peternakan: PeternakanBatch[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadAll();
  }

  // ===== Data Loader (mock) =====
  async loadAll() {
    this.akuakultur = await this.load<AkuakulturBatch[]>(
      '/assets/mock/batch-akuakultur.json'
    );
    this.hidroponik = await this.load<HidroponikBatch[]>(
      '/assets/mock/batch-hidroponik.json'
    );
    this.hortikultura = await this.load<HortikulturaBatch[]>(
      '/assets/mock/batch-hortikultura.json'
    );
    this.peternakan = await this.load<PeternakanBatch[]>(
      '/assets/mock/batch-peternakan.json'
    );
  }

  async load<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return await res.json();
  }

  // ===== Events =====
  private emitAdd(kind: string) {
    this.dispatchEvent(
      new CustomEvent('add-item', {
        detail: { kind },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitEdit(
    item:
      | AkuakulturBatch
      | HidroponikBatch
      | HortikulturaBatch
      | PeternakanBatch
  ) {
    this.dispatchEvent(
      new CustomEvent('edit-item', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );
  }

  // ===== UI Helpers =====
  private renderCard(title: string, emoji: string, kind: string, items: any[]) {
    return html`
      <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">${emoji} ${title}</h3>
          <button
            class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            @click=${() => this.emitAdd(kind)}
          >
            ➕ Tambah
          </button>
        </div>

        ${items?.length === 0
          ? html`<div class="text-gray-500 text-sm italic">
              Belum ada data.
            </div>`
          : html`
              <ul class="space-y-2">
                ${items.map(
                  (item) => html`
                    <li
                      class="p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                      @click=${() => this.emitEdit(item)}
                    >
                      <div class="font-medium">
                        ${item?.name ?? item?.title ?? 'Tanpa nama'}
                      </div>
                      <div class="text-sm text-gray-500 flex gap-2">
                        <span>${item?.id ?? item?.code ?? '-'}</span>
                        ${item?.startedAt
                          ? html`<span
                              >• Mulai:
                              ${new Date(
                                item.startedAt
                              ).toLocaleDateString()}</span
                            >`
                          : ''}
                        ${item?.status
                          ? html`<span>• ${item.status}</span>`
                          : ''}
                      </div>
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
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        ${this.renderCard('Akuakultur', '🐟', 'akuakultur', this.akuakultur)}
        ${this.renderCard('Hidroponik', '💧🌿', 'hidroponik', this.hidroponik)}
        ${this.renderCard(
          'Hortikultura',
          '🥬',
          'hortikultura',
          this.hortikultura
        )}
        ${this.renderCard('Peternakan', '🐄', 'peternakan', this.peternakan)}
      </div>
    `;
  }
}
