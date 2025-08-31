// frontend/src/pages/histori.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-histori')
export class PageHistori extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="bg-white shadow rounded p-6">
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-green-800">📜 Riwayat Kejadian</h2>
          <p class="text-gray-500 text-sm">
            Histori pembacaan data sensor hidroponik
          </p>
        </div>

        <div class="flex justify-between items-center mb-3">
          <label class="text-sm text-gray-600 font-medium"
            >Filter tanggal:
            <input
              type="date"
              class="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </label>
          <button
            class="bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700 transition"
          >
            🔄 Refresh
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left border">
            <thead class="bg-gray-100 text-gray-700 font-semibold border-b">
              <tr>
                <th class="px-4 py-2">⏱ Waktu</th>
                <th class="px-4 py-2">🌡 Suhu</th>
                <th class="px-4 py-2">💧 pH</th>
                <th class="px-4 py-2">🌿 Nutrisi</th>
                <th class="px-4 py-2">📶 Status</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              ${this.renderRow(
                '2025-07-29 09:12',
                '25.3°C',
                '6.1',
                '890 ppm',
                'Normal'
              )}
              ${this.renderRow(
                '2025-07-29 08:45',
                '26.0°C',
                '6.5',
                '870 ppm',
                'Normal'
              )}
              ${this.renderRow(
                '2025-07-29 08:15',
                '28.4°C',
                '6.9',
                '1020 ppm',
                '⚠️ Tinggi'
              )}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  renderRow(
    waktu: string,
    suhu: string,
    ph: string,
    nutrisi: string,
    status: string
  ) {
    const statusColor = status.includes('Tinggi')
      ? 'text-red-600'
      : 'text-green-700';
    return html`
      <tr class="border-b">
        <td class="px-4 py-2">${waktu}</td>
        <td class="px-4 py-2">${suhu}</td>
        <td class="px-4 py-2">${ph}</td>
        <td class="px-4 py-2">${nutrisi}</td>
        <td class="px-4 py-2 font-medium ${statusColor}">${status}</td>
      </tr>
    `;
  }
}
