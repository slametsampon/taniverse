import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dashboard-hidroponik')
export class DashboardHidroponik extends LitElement {
  static styles = css`
    :host {
      @apply block bg-white p-4 rounded shadow;
    }
  `;

  render() {
    return html`
      <h2 class="text-lg font-semibold mb-2">Hidroponik Monitor</h2>
      <div class="text-sm text-gray-600">
        📡 Data sensor akan ditampilkan di sini.
      </div>
    `;
  }
}
