// frontend/src/components/device-list.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchAllDevices } from 'src/services/device.service';
import type { Device } from '@models/device.model';
import { DeviceHelper } from '../services/device-helper';

import './cards/device-card';

/**
 * Komponen untuk menampilkan daftar semua perangkat dengan nilai terkini.
 */
@customElement('device-list')
export class DeviceList extends LitElement {
  @state()
  private devices: Device[] = [];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    fetchAllDevices().then((list: Device[]) => {
      this.devices = list;
      this.requestUpdate();
    });
  }

  /**
   * Dapatkan nilai terkini berdasarkan tipe device
   */
  private getCurrentValue(device: Device): string | null {
    const value =
      device.type === 'sensor'
        ? DeviceHelper.getSensorValue(device.tagNumber)
        : device.type === 'actuator'
        ? DeviceHelper.getActuatorState(device.tagNumber)
        : null;

    if (value == null) return '--';

    if (typeof value === 'number') {
      // Format default angka
      return value.toFixed(1);
    }

    return String(value);
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
        ${this.devices.map((device) => {
          const value = this.getCurrentValue(device);
          return html`
            <device-card
              class="min-h-[100px]"
              .device=${device}
              .value=${value}
            ></device-card>
          `;
        })}
      </div>
    `;
  }
}
