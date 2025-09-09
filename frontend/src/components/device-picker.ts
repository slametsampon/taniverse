// frontend/src/components/device-picker.ts

import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { fetchAllDevices } from 'src/services/device.service';
import type { Device } from '@models/device.model';

@customElement('device-picker')
export class DevicePicker extends LitElement {
  createRenderRoot() {
    return this; // Light DOM → agar Tailwind tetap berlaku
  }

  @state()
  private devices: any[] = [];

  @property({ type: String })
  value: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    fetchAllDevices().then((list: Device[]) => {
      this.devices = list;
      this.requestUpdate();
    });
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const selected = target.value;

    this.value = selected;

    const pickedDevice = this.devices.find((d) => d.tagNumber === selected);
    console.log('[device-picker] Selected tagNumber:', selected);
    console.log('[device-picker] Selected device:', pickedDevice);

    this.dispatchEvent(
      new CustomEvent('device-select', {
        detail: {
          mode: selected === '' ? 'new' : 'edit',
          tagNumber: selected,
          device: pickedDevice, // ✅ Kirim objek lengkap
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="flex flex-col space-y-1 w-full max-w-md">
        <label for="device-picker" class="text-sm font-medium text-gray-700">
          Pilih Perangkat
        </label>
        <select
          id="device-picker"
          class="form-select w-full border rounded-md px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change=${this.handleChange}
        >
          <option value="">🆕 Tambah Tagnumber Baru</option>
          ${this.devices.map(
            (dev) => html`
              <option
                value=${dev.tagNumber}
                ?selected=${this.value === dev.tagNumber}
              >
                ${dev.tagNumber} — ${dev.description}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}
