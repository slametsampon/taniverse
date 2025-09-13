// frontend/src/pages/dashboard.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import 'src/components/ui/ui-tabs.js';
import 'src/components/dashboard-mqtt.ts';

// Impor komponen halaman domain produksi
import './produksi/hidroponik.ts';
import './produksi/hortikultura.ts';
import './produksi/akuakultur.ts';
import './produksi/peternakan.ts';

// ✨ Tab baru: Event
import 'src/components/event-table';

@customElement('page-dashboard')
export class PageDashboard extends LitElement {
  @state() private activeTab: 'produksi' | 'devices' | 'history' = 'produksi';
  @state() private domain:
    | 'hidroponik'
    | 'hortikultura'
    | 'akuakultur'
    | 'peternakan' = 'hidroponik';

  createRenderRoot() {
    return this; // light DOM
  }

  private handleTabChange(e: CustomEvent<{ id: string }>) {
    this.activeTab = e.detail.id as 'produksi' | 'devices' | 'history';
  }

  private handleDomainSelect(e: Event) {
    const selected = (e.target as HTMLSelectElement).value;
    this.domain = selected as any;
  }

  private renderProduksiContent() {
    return html`
      <div class="mt-4 mb-4">
        <label class="block mb-2 text-lg font-medium text-gray-700">
          Pilih Domain Produksi:
        </label>
        <select
          @change=${this.handleDomainSelect}
          class="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-800"
        >
          <option value="hidroponik" ?selected=${this.domain === 'hidroponik'}>
            🌱 Hidroponik
          </option>
          <option
            value="hortikultura"
            ?selected=${this.domain === 'hortikultura'}
          >
            🥬 Hortikultura
          </option>
          <option value="akuakultur" ?selected=${this.domain === 'akuakultur'}>
            🐟 Akuakultur
          </option>
          <option value="peternakan" ?selected=${this.domain === 'peternakan'}>
            🐔 Peternakan
          </option>
        </select>
      </div>

      <section>
        ${this.domain === 'hidroponik'
          ? html`<hidroponik-page class="block mb-6"></hidroponik-page>`
          : this.domain === 'hortikultura'
          ? html`<hortikultura-page class="block mb-6"></hortikultura-page>`
          : this.domain === 'akuakultur'
          ? html`<akuakultur-page class="block mb-6"></akuakultur-page>`
          : this.domain === 'peternakan'
          ? html`<peternakan-page class="block mb-6"></peternakan-page>`
          : null}
      </section>
    `;
  }

  // 🔌 Konten untuk tab "Devices" (dashboard-mqtt)
  private renderMqttContent() {
    return html`
      <section class="space-y-6">
        <dashboard-mqtt class="block"></dashboard-mqtt>
      </section>
    `;
  }

  // 📜 Konten untuk tab "History"
  private renderHistoryContent() {
    return html`
      <section class="space-y-6">
        <event-table class="block mt-6"></event-table>
      </section>
    `;
  }

  render() {
    return html`
      <div class="p-4 space-y-4">
        <ui-tabs
          .tabs=${[
            { id: 'produksi', label: 'Produksi', icon: '🏭' },
            { id: 'devices', label: 'Devices', icon: '🔌' },
            { id: 'history', label: 'Event History', icon: '📜' },
          ]}
          .active=${this.activeTab}
          @dev-tab-change=${this.handleTabChange}
        ></ui-tabs>

        ${this.activeTab === 'produksi'
          ? this.renderProduksiContent()
          : this.activeTab === 'devices'
          ? this.renderMqttContent()
          : this.renderHistoryContent()}
      </div>
    `;
  }
}
