import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('peternakan-page')
export class PeternakanPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="p-4">
        <h1 class="text-xl font-bold">🐄 Peternakan</h1>
        <p>Modul produksi peternakan (belum aktif).</p>
      </section>
    `;
  }
}
