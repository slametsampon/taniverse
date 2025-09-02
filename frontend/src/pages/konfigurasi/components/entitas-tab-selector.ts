// frontend/src/pages/konfigurasi/components/entitas-tab-selector.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('entitas-tab-selector')
export class EntitasTabSelector extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @property({ type: String }) selected: 'tanaman' | 'ikan' | 'ayam' = 'tanaman';

  private onChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value as
      | 'tanaman'
      | 'ikan'
      | 'ayam';
    this.dispatchEvent(
      new CustomEvent('entitas-kind-change', {
        detail: { kind: value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <label
        class="text-sm font-medium text-gray-700 mr-2"
        for="entitas-selector"
      >
        Pilih Entitas:
      </label>
      <select
        id="entitas-selector"
        class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @change=${this.onChange}
      >
        <option value="tanaman" ?selected=${this.selected === 'tanaman'}>
          Tanaman 🌱
        </option>
        <option value="ikan" ?selected=${this.selected === 'ikan'}>
          Ikan 🐟
        </option>
        <option value="ayam" ?selected=${this.selected === 'ayam'}>
          Ayam 🐔
        </option>
      </select>
    `;
  }
}
