import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('perikanan-page')
export class PerikananPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="p-4">
        <h1 class="text-xl font-bold">🐟 Perikanan</h1>
        <p>Modul produksi perikanan (belum aktif).</p>
      </section>
    `;
  }
}
