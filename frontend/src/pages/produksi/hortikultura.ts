import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hortikultura-page')
export class HortikulturaPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="p-4">
        <h1 class="text-xl font-bold">🥬 Hortikultura</h1>
        <p>Modul produksi hortikultura (belum aktif).</p>
      </section>
    `;
  }
}
// c:\Users\sam294\Documents\Projects\Agro\taniverse\frontend\src\pages\produksi\hortikultura.ts
