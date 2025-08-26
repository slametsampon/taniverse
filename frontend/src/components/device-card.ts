import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Device } from '../services/devices-service';

@customElement('device-card')
export class DeviceCard extends LitElement {
  @property({ type: Object }) device!: Device;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="p-4 rounded-xl shadow bg-white">
        <div class="text-lg font-semibold text-green-600">
          ${this.device.tagNumber}
        </div>
        <div class="text-xs font-mono text-gray-800">
          ${this.device.description}
        </div>
        <div class="text-sm text-gray-500 capitalize">${this.device.type}</div>
      </div>
    `;
  }
}
