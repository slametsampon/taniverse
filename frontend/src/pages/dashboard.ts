import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../domains/hidroponik/dashboard-hidoponik';

@customElement('page-dashboard')
export class PageDashboard extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <h1 class="text-xl font-bold mb-2">🌱 TaniVerse Dashboard</h1>
      <dashboard-hidroponik></dashboard-hidroponik>
      <!-- bisa tambah domain lain di sini -->
    `;
  }
}
