import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dashboard-hidroponik')
export class DashboardHidroponik extends LitElement {
  createRenderRoot() {
    return this; // ✅ Render ke light DOM agar Tailwind aktif tanpa shadow DOM
  }

  render() {
    return html`
      <div class="block bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-2">Hidroponik</h2>
        <p class="text-sm text-gray-600">📡 Sensor aktif</p>
      </div>
    `;
  }
}
