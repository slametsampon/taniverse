// frontend/src/components/cards/device-card.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceStatus } from '@models/device.model';
import type { DeviceView } from 'src/models/device-view.model';

@customElement('device-card')
export class DeviceCard extends LitElement {
  @property({ type: Object }) device!: DeviceView;

  createRenderRoot() {
    return this;
  }

  private getStatusClass(status: DeviceStatus['valueStatus']) {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-700';
      case 'low-alarm':
      case 'high-alarm':
        return 'bg-red-100 text-red-700';
      case 'sensor-fail':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  }

  private openDetail = () => {
    const dlg = document.querySelector('device-dialog') as any;
    dlg?.open?.(this.device.tagNumber);
  };

  render() {
    const {
      tagNumber,
      description,
      type,
      unit,
      display_precision,
      value,
      state,
      status,
    } = this.device;

    const valueDisplay =
      type === 'sensor'
        ? value !== undefined
          ? `${value.toFixed(display_precision)} ${unit ?? ''}`
          : '--'
        : state ?? '--';

    const statusLabel = status.valueStatus ?? 'unknown';
    const statusClass = this.getStatusClass(status.valueStatus);

    return html`
      <div
        class="p-4 rounded-xl shadow bg-gray-50 space-y-2 cursor-pointer hover:bg-gray-100 transition"
        @click=${this.openDetail}
      >
        <div class="text-lg font-semibold text-green-600">${tagNumber}</div>
        <div class="text-xs font-mono text-gray-800">${description}</div>
        <div class="text-sm text-gray-500 capitalize">${type}</div>

        <div class="text-xl font-bold">${valueDisplay}</div>

        <div
          class="text-xs px-2 py-1 rounded inline-block font-medium ${statusClass}"
        >
          Status: ${statusLabel}
        </div>
      </div>
    `;
  }
}
