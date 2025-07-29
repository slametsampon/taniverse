import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dashboard-aquakultur')
export class DashboardAquakultur extends LitElement {
  createRenderRoot() {
    return this; // Render ke light DOM agar Tailwind aktif
  }

  render() {
    return html`
      <section
        class="bg-white rounded-xl shadow p-6 space-y-4 border border-blue-100"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-blue-800 flex items-center gap-2">
            🐟 Akuakultur
          </h2>
          <span class="text-sm text-gray-500">Zona 2</span>
        </header>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-1">💧 Suhu Air</p>
            <div class="text-lg font-semibold text-blue-700">28°C</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">⚡ Aerator</p>
            <div class="text-lg font-semibold text-green-600">Aktif</div>
          </div>

          <div>
            <p class="text-sm text-gray-500 mb-1">🌿 pH Air</p>
            <div class="text-lg font-semibold text-blue-600">7.2</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">🧪 Oksigen Terlarut</p>
            <div class="text-lg font-semibold text-blue-600">6.8 mg/L</div>
          </div>
        </div>

        <footer class="text-xs text-gray-400 text-right">
          Terakhir diperbarui: 07:34 WIB
        </footer>
      </section>
    `;
  }
}
