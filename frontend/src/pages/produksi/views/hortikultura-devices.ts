// frontend/src/pages/produksi/views/hortikultura-devices.ts

// 🌾 Hortikultura Devices View – Dashboard Komponen Perangkat

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore } from '../../../services/devices-store';

import '../../../components/cards/dashboard-device-card';
import { formatDeviceValue } from 'src/utils/format-display';

@customElement('hortikultura-devices')
export class DashboardHortikultura extends LitElement {
  createRenderRoot() {
    return this;
  }

  private off?: () => void;

  @state() private statusMap: Record<string, string> = {};

  // 🌱 Daftar TAG perangkat hortikultura
  private deviceTags = ['TI-401', 'AI-401', 'AI-402', 'P-401', 'P-402'];

  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init();
    this.pull();
    this.off = devicesStore.onChange(() => this.pull());
  }

  disconnectedCallback() {
    this.off?.();
    super.disconnectedCallback();
  }

  private pull() {
    const statusMap: Record<string, string> = {};
    this.deviceTags.forEach((tag) => {
      statusMap[tag] = devicesStore.getStatus(tag);
    });
    this.statusMap = statusMap;
  }

  private handleDeviceClick(e: CustomEvent) {
    const tag = e.detail.tag;
    const dlg = document.querySelector('device-dialog') as any;
    dlg?.open?.(tag);
  }

  render() {
    return html`
      <section
        class="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        @device-click=${this.handleDeviceClick}
      >
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌾 Hortikultura Sensor & Aktuator
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${this.deviceTags.map((tag) => {
            const device = devicesStore.get(tag);
            if (!device) return null;

            const value = formatDeviceValue(device);

            return html`
              <dashboard-device-card
                .device=${device}
                .tag=${tag}
                .value=${value}
              ></dashboard-device-card>
            `;
          })}
        </div>
      </section>
    `;
  }
}
