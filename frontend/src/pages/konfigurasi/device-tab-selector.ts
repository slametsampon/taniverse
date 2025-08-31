// frontend/src/pages/konfigurasi/device-tab-selector.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('device-tab-selector')
export class DeviceTabSelector extends LitElement {
  @property({ type: String }) selected: 'general' | 'hw-comm' | 'loc-meta' =
    'general';

  createRenderRoot() {
    // ✅ Use Light DOM
    return this;
  }

  private onChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value as
      | 'general'
      | 'hw-comm'
      | 'loc-meta';
    this.dispatchEvent(
      new CustomEvent('dev-device-view-change', {
        detail: { view: value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="flex items-center gap-2">
        <label class="font-medium text-sm">Sub View:</label>
        <select
          class="border border-gray-300 rounded px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change=${this.onChange}
          .value=${this.selected}
        >
          <option value="general">General</option>
          <option value="hw-comm">H/W & Comm</option>
          <option value="loc-meta">Lokasi & Metadata</option>
        </select>
      </div>
    `;
  }
}
