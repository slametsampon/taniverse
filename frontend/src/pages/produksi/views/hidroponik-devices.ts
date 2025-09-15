// frontend/src/pages/produksi/views/hidroponik-devices.ts

// 🌱 Hidroponik Devices View – Dashboard Komponen Perangkat

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore } from 'src/services/devices-store';

import 'src/components/cards/dashboard-device-card';
import { formatDeviceValue } from 'src/utils/format-display';

@customElement('hidroponik-devices')
export class DashboardHidroponik extends LitElement {
  // Disable shadow DOM agar styling global tetap berpengaruh
  createRenderRoot() {
    return this;
  }

  private off?: () => void;

  // 🌊 State untuk status pompa (hanya ON/OFF)
  @state() private pompaState: 'ON' | 'OFF' = 'OFF';

  // 📟 Menyimpan status masing-masing device berdasarkan TAG
  @state() private statusMap: Record<string, string> = {};

  // ⛓️ Lifecycle Hook: Saat komponen di-*attach* ke DOM
  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init(); // Inisialisasi store dari service
    this.pull(); // Tarik data awal
    this.off = devicesStore.onChange(() => this.pull()); // Reaktif terhadap perubahan store
  }

  // 🔌 Bersihkan listener saat komponen di-*detach*
  disconnectedCallback() {
    this.off?.();
    super.disconnectedCallback();
  }

  // 🏷️ Daftar TAG device yang ingin ditampilkan
  private deviceTags = ['TI-001', 'LI-004', 'AI-005', 'AI-006', 'P-001'];

  // 🔄 Tarik status terbaru dari devicesStore
  private pull() {
    const statusMap: Record<string, string> = {};
    this.deviceTags.forEach((tag) => {
      statusMap[tag] = devicesStore.getStatus(tag);
    });
    this.statusMap = statusMap;
  }

  // 📥 Handler ketika user klik salah satu device
  private handleDeviceClick(e: CustomEvent) {
    const tag = e.detail.tag;
    const dlg = document.querySelector('device-dialog') as any;
    dlg?.open?.(tag);
  }

  // 🎨 Render UI dashboard
  render() {
    return html`
      <section
        class="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        @device-click=${this.handleDeviceClick}
      >
        <!-- 🧠 Header Seksi Dashboard -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌡️💧 Hidroponik Sensor & Aktuator
          </h2>
        </div>

        <!-- 📊 Grid Tampilan Perangkat -->
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
