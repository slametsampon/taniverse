import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore } from '../services/devices-service';
import type { Device } from '../services/devices-service';
import './device-card';

@customElement('device-list')
export class DeviceList extends LitElement {
  @state()
  private devices: Device[] = [];

  createRenderRoot() {
    return this; // Light DOM
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Init devices store & subscribe to updates
    devicesStore.init().then(() => {
      this.updateDevices();
    });

    devicesStore.onChange(() => {
      this.updateDevices();
    });
  }

  private updateDevices() {
    const tags = devicesStore.getAllTags();
    this.devices = tags
      .map((tag) => {
        const d = devicesStore.get(tag);
        return d ? { ...d } : undefined; // 👈 trigger Lit reactivity
      })
      .filter((d): d is Device => d !== undefined);
  }

  render() {
    if (this.devices.length === 0) {
      return html`<div class="text-gray-500 text-sm">
        Tidak ada perangkat terdeteksi.
      </div>`;
    }

    return html`
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        ${this.devices.map(
          (device) => html`<device-card .device=${device}></device-card>`
        )}
      </div>
    `;
  }
}
