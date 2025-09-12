// frontend/src/pages/produksi/views/peternakan-devices.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore } from '../../../services/devices-store';
import { formatDeviceValue } from 'src/utils/format-display';

import '../../../components/cards/dashboard-device-card';

@customElement('peternakan-devices')
export class PeternakanDevices extends LitElement {
  createRenderRoot() {
    return this; // Light DOM agar Tailwind aktif
  }

  private off?: () => void;

  @state() private statusMap: Record<string, string> = {};

  // daftar device untuk kandang ayam
  private deviceTags = ['TI-301', 'AI-301', 'AI-302', 'H-301', 'B-301'];

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
            🌡️💧 Peternakan Sensor & Aktuator
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
