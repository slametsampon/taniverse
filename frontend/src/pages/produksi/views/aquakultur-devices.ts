// frontend/src/pages/produksi/views/aquakultur-devices.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore } from 'src/services/devices-store';

import 'src/components/cards/dashboard-device-card';
import { formatDeviceValue } from 'src/utils/format-display';

@customElement('aquakultur-devices')
export class DashboardAquakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  private off?: () => void;

  @state() private statusMap: Record<string, string> = {};

  private deviceTags = ['TI-101', 'AI-105', 'AI-106', 'P-101'];

  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init(true);
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
        class="bg-white rounded shadow p-4"
        @device-click=${this.handleDeviceClick}
      >
        <!-- 🧠 Header Seksi Dashboard -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌡️💧 Akuakultur Sensor & Aktuator
          </h2>
        </div>

        <!-- 📊 Grid Tampilan Perangkat -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
