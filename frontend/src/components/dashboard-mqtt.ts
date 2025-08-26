import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './device-list.ts'; // pastikan ini sudah ada

@customElement('dashboard-mqtt')
export class DashboardMqtt extends LitElement {
  createRenderRoot() {
    return this; // Light DOM untuk Tailwind
  }

  render() {
    return html`
      <div class="p-4 space-y-4">
        <h1 class="text-2xl font-bold text-gray-800">Dashboard MQTT</h1>

        <device-list></device-list>
      </div>
    `;
  }
}
