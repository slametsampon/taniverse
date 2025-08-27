import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Device } from '../services/devices-service';

@customElement('device-card')
export class DeviceCard extends LitElement {
  @property({ type: Object }) device!: Device;

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

  render() {
    const { tagNumber, description, type, status = 'unknown' } = this.device;

    return html`
      <div class="p-4 rounded-xl shadow bg-white space-y-2">
        <div class="text-lg font-semibold text-green-600">${tagNumber}</div>
        <div class="text-xs font-mono text-gray-800">${description}</div>
        <div class="text-sm text-gray-500 capitalize">${type}</div>

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
