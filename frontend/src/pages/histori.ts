import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-histori')
export class PageHome extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="text-red-600">Histori Page</div>`;
  }
}
