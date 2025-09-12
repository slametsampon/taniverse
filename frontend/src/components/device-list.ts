// frontend/src/components/device-list.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchAllDevices } from 'src/services/device.service';
import type { DeviceModel, DeviceStatus } from '@models/device.model';
import { devicesStore } from 'src/services/devices-store';
import type { DeviceView } from 'src/models/device-view.model';

import './cards/device-card';

@customElement('device-list')
export class DeviceList extends LitElement {
  @state()
  private devices: DeviceView[] = [];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    devicesStore.onChange(() => {
      // Update live data saat store berubah
      this.devices = this.devices.map((d) => this.toView(d));
      this.requestUpdate();
    });

    this.loadDevices();
  }

  private async loadDevices() {
    const raw = await fetchAllDevices();
    this.devices = raw.map((dev) => this.toView(dev));
    this.requestUpdate();
  }

  private toView(dev: DeviceModel): DeviceView {
    const live = devicesStore.get(dev.tagNumber);
    const status: DeviceStatus = live?.status ?? {
      mqtt: 'disconnected',
      valueStatus: 'sensor-fail',
      lastSeen: undefined,
    };

    const value = live?.value ?? undefined;
    const state = live?.state ?? undefined;

    return {
      tagNumber: dev.tagNumber,
      description: dev.description,
      type: dev.type,
      unit: dev.unit,
      display_precision: dev.display_precision ?? 1,
      value,
      state,
      status,
    };
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
