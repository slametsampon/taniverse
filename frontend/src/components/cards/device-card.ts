// frontend/src/components/cards/device-card.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Device } from '../../services/devices-store';

@customElement('device-card')
export class DeviceCard extends LitElement {
  @property({ type: Object }) device!: Device;

  /** Optional value to display — dynamic sensor/actuator value */
  @property({ type: String }) value: string | null = null;

  createRenderRoot() {
    return this;
  }

  private getStatusClass(status: string) {
    switch (status) {
      case 'ok':
        return 'bg-green-100 text-green-700';
      case 'alarm-low':
      case 'alarm-high':
        return 'bg-red-100 text-red-700';
      case 'disconnected':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  }

  private openDetail = () => {
    const dlg = document.querySelector('device-dialog') as any;
    if (!dlg?.open) {
      console.error('[device-card] device-dialog not found or invalid.');
      return;
    }
    dlg.open(this.device.tagNumber);
  };

  render() {
    const { tagNumber, description, type, status = 'unknown' } = this.device;
    const valueHtml = this.value
      ? html`<div class="text-xl font-bold">${this.value}</div>`
      : null;

    return html`
      <div
        class="p-4 rounded-xl shadow bg-white space-y-2 cursor-pointer hover:bg-gray-50 transition"
        @click=${this.openDetail}
      >
        <div class="text-lg font-semibold text-green-600">${tagNumber}</div>
        <div class="text-xs font-mono text-gray-800">${description}</div>
        <div class="text-sm text-gray-500 capitalize">${type}</div>

        ${valueHtml}

        <div
          class="text-xs px-2 py-1 rounded inline-block font-medium ${this.getStatusClass(
            status
          )}"
        >
          Status: ${status}
        </div>
      </div>
    `;
  }
}
