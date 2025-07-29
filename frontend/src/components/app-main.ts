import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

// Import all page components
import '../pages/home.ts';
import '../pages/dashboard.ts';
import '../pages/histori.ts';
import '../pages/not-found.ts';

@customElement('app-main')
export class AppMain extends LitElement {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const outlet =
      this.shadowRoot?.getElementById('outlet') ||
      document.getElementById('outlet');
    const router = new Router(outlet!);
    router.setRoutes([
      { path: '/', component: 'page-home' }, // ✅ default route
      { path: '/dashboard', component: 'page-dashboard' },
      { path: '/histori', component: 'page-histori' },
      { path: '(.*)', component: 'page-not-found' },
    ]);
  }

  render() {
    return html`
      <nav class="bg-green-100 p-4 flex gap-4 text-green-900 font-medium">
        <a href="/" @click=${this._navigate}>🏠 Home</a>
        <a href="/dashboard" @click=${this._navigate}>📊 Dashboard</a>
        <a href="/histori" @click=${this._navigate}>📈 Histori</a>
      </nav>
      <div id="outlet" class="p-4"></div>
    `;
  }

  private _navigate(e: Event) {
    e.preventDefault();
    const anchor = e.currentTarget as HTMLAnchorElement;
    window.history.pushState({}, '', anchor.href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}
