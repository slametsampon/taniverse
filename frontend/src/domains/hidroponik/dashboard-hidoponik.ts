import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('dashboard-hidroponik')
export class DashboardHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private pompaAktif: boolean = false;

  togglePompa() {
    this.pompaAktif = !this.pompaAktif;
    // TODO: publish ke MQTT: "taniverse/hidroponik/pompa" → true/false
  }

  render() {
    const pompaStatus = this.pompaAktif ? 'Aktif' : 'Mati';
    const pompaColor = this.pompaAktif
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

    return html`
      <section class="bg-white rounded shadow p-4">
        <h2 class="text-xl font-semibold text-green-800 mb-4">🌱 Hidroponik</h2>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="p-3 border rounded bg-gray-50">
            <div class="text-sm text-gray-500">Nutrisi</div>
            <div class="text-lg font-bold text-green-700">950 ppm</div>
          </div>
          <div class="p-3 border rounded bg-gray-50">
            <div class="text-sm text-gray-500">pH</div>
            <div class="text-lg font-bold text-blue-700">6.2</div>
          </div>
          <div class="p-3 border rounded bg-gray-50">
            <div class="text-sm text-gray-500">Suhu Air</div>
            <div class="text-lg font-bold text-orange-600">25.4 °C</div>
          </div>
          <div class="p-3 border rounded bg-gray-50">
            <div class="text-sm text-gray-500">Ketinggian Air</div>
            <div class="text-lg font-bold text-cyan-700">75%</div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Pompa Nutrisi:</div>
          <div class="flex items-center gap-2">
            <span class="text-sm px-2 py-1 rounded ${pompaColor}"
              >${pompaStatus}</span
            >
            <button
              class="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              @click=${this.togglePompa}
            >
              ${this.pompaAktif ? 'Matikan' : 'Nyalakan'}
            </button>
          </div>
        </div>
      </section>
    `;
  }
}
