import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dashboard-peternakan')
export class DashboardPeternakan extends LitElement {
  createRenderRoot() {
    return this; // Light DOM agar Tailwind aktif
  }

  render() {
    return html`
      <section
        class="bg-white rounded-xl shadow p-6 space-y-4 border border-yellow-100"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-yellow-800 flex items-center gap-2">
            🐔 Peternakan
          </h2>
          <span class="text-sm text-gray-500">Kandang A</span>
        </header>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-1">🌡️ Suhu Kandang</p>
            <div class="text-lg font-semibold text-yellow-700">32°C</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">🌀 Ventilasi</p>
            <div class="text-lg font-semibold text-green-600">Aktif</div>
          </div>

          <div>
            <p class="text-sm text-gray-500 mb-1">💡 Penerangan</p>
            <div class="text-lg font-semibold text-yellow-600">On</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">🥚 Produksi Telur</p>
            <div class="text-lg font-semibold text-gray-700">82 butir/hari</div>
          </div>
        </div>

        <footer class="text-xs text-gray-400 text-right">
          Terakhir diperbarui: 07:34 WIB
        </footer>
      </section>
    `;
  }
}
