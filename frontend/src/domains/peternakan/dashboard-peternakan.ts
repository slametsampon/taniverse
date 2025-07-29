import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dashboard-peternakan')
export class DashboardPeternakan extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-semibold mb-2 text-yellow-800">
          🐔 Peternakan
        </h2>
        <p class="text-sm text-gray-600">🌡️ Suhu kandang: 32°C</p>
        <p class="text-sm text-gray-600">🌀 Ventilasi: Aktif</p>
      </section>
    `;
  }
}
