// frontend/src/pages/konfigurasi/view-prod-hortikultura.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('view-prod-hortikultura')
export class ViewProdhortikultura extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="p-4 border rounded shadow-sm bg-green-50">
        <h2 class="text-lg font-semibold text-green-700 mb-2">
          Konfigurasi hortikultura
        </h2>
        <p class="text-sm text-gray-600">
          Ini adalah placeholder untuk setup domain hortikultura.
        </p>
      </div>
    `;
  }
}
