import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hidroponik-page')
export class HidroponikPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="p-4">
        <h1 class="text-xl font-bold">🌱 Hidroponik</h1>
        <p>Modul produksi hidroponik aktif.</p>
      </section>
    `;
  }
}
// c:\Users\sam294\Documents\Projects\Agro\taniverse\frontend\src\pages\produksi\hidroponik.ts
