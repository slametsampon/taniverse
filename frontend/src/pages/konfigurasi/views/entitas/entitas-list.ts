// frontend/src/pages/konfigurasi/views/entitas/entitas-list.ts

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Plant } from '@models/plant.model';

@customElement('entitas-list')
export class EntitasList extends LitElement {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0.5rem;
      border: 1px solid #ddd;
    }
    th {
      background-color: #f3f4f6;
      text-align: left;
    }
    tr:hover {
      background-color: #fef9c3;
    }
  `;

  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @property({ type: String }) kind: 'tanaman' | 'ikan' | 'ayam' = 'tanaman';
  @state() private items: Plant[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadMockData();
  }

  private async loadMockData() {
    let url = '';
    switch (this.kind) {
      case 'tanaman':
        url = '/assets/mock/plants.json';
        break;
      case 'ikan':
        url = '/assets/mock/aquatic-species.json';
        break;
      case 'ayam':
        url = '/assets/mock/livestock.json';
        break;
    }
    const res = await fetch(url);
    this.items = await res.json();
  }

  private handleAdd() {
    this.dispatchEvent(new CustomEvent('add-item'));
  }

  private handleEdit(item: Plant) {
    this.dispatchEvent(
      new CustomEvent('edit-item', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-800">
            Daftar Entitas - ${this.kind.toUpperCase()}
          </h3>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            @click=${this.handleAdd}
          >
            ➕ Tambah Baru
          </button>
        </div>

        <table class="table-auto text-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Hari Tumbuh</th>
              <th>Berat (gr)</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${this.items.map(
              (item) => html`
                <tr>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.growthDaysMin} - ${item.growthDaysMax} hr</td>
                  <td>${item.avgWeightG ?? '-'}</td>
                  <td>Rp ${item.pricePerKg?.toLocaleString()}</td>
                  <td>
                    <button
                      class="text-blue-600 hover:underline"
                      @click=${() => this.handleEdit(item)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
