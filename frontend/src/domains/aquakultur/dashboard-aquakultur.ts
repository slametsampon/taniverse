import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dashboard-aquakultur')
export class DashboardAquakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-semibold mb-2 text-blue-800">🐟 Akuakultur</h2>
        <p class="text-sm text-gray-600">💧 Suhu air: 28°C</p>
        <p class="text-sm text-gray-600">⚡ Aerator: Aktif</p>
      </section>
    `;
  }
}
