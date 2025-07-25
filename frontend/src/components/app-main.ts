import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../domains/hidroponik/dashboard-hidoponik';

@customElement('app-main')
export class AppMain extends LitElement {
  static styles = css`
    :host {
      @apply block p-6 bg-gray-100 min-h-screen;
    }
  `;

  render() {
    return html`
      <div class="text-xl font-bold text-green-700 mb-4">
        🌱 TaniVerse Dashboard
      </div>
      <dashboard-hidroponik></dashboard-hidroponik>
    `;
  }
}
