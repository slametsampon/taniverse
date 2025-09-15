// frontend/src/components/dashboard-device-panel.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { devicesStore } from 'src/services/devices-store';
import { formatDeviceValue } from 'src/utils/format-display';

import 'src/components/cards/dashboard-device-card';

@customElement('dashboard-device-panel')
export class DashboardDevicePanel extends LitElement {
  createRenderRoot() {
    return this; // gunakan Light DOM agar styling global tetap aktif
  }

  // Props dari luar (domain)
  @property({ type: Array }) deviceTags: string[] = [];
  @property({ type: String }) title: string = '📟 Devices';
  @property({ type: Boolean }) forceInit: boolean = false;
  @property({ type: String }) gridClass: string =
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  @state() private statusMap: Record<string, string> = {};
  private off?: () => void;

  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init(this.forceInit);
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
            ${this.title}
          </h2>
        </div>

        <div class="grid ${this.gridClass} gap-4">
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
