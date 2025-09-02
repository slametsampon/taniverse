// frontend/src/pages/konfigurasi/production-tab-selector.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('production-tab-selector')
export class ProductionTabSelector extends LitElement {
  @property({ type: String }) selected: string = 'hidroponik';

  createRenderRoot() {
    return this;
  }

  private onChange(e: Event) {
    const domain = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(
      new CustomEvent('prod-domain-change', {
        detail: { domain },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="flex items-center gap-2 my-4">
        <label class="text-sm font-medium">Pilih Domain:</label>
        <select
          class="border px-3 py-1 rounded text-sm shadow-sm"
          @change=${this.onChange}
          .value=${this.selected}
        >
          <option value="hidroponik">Hidroponik</option>
          <option value="hortikultura">Hortikultura</option>
          <option value="akuakultur">Akuakultur</option>
          <option value="peternakan">Peternakan</option>
        </select>
      </div>
    `;
  }
}
