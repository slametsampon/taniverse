import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

import '../pages/home.ts';
import '../pages/dashboard.ts';
import '../pages/histori.ts';
import '../pages/not-found.ts';

@customElement('app-main')
export class AppMain extends LitElement {
  @state() private currentPath = window.location.pathname;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const outlet =
      this.shadowRoot?.getElementById('outlet') ||
      document.getElementById('outlet');

    const router = new Router(outlet!);
    router.setRoutes([
      { path: '/', component: 'page-home' },
      { path: '/dashboard', component: 'page-dashboard' },
      { path: '/histori', component: 'page-histori' },
      { path: '(.*)', component: 'page-not-found' },
    ]);

    // Update currentPath on navigation
    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
    });
  }

  render() {
    const isActive = (path: string) =>
      this.currentPath === path
        ? 'bg-green-300 text-green-900 rounded px-2 py-1'
        : 'hover:bg-green-200 rounded px-2 py-1';

    return html`
      <nav class="bg-green-100 p-4 flex gap-4 text-green-900 font-medium">
        <a href="/" @click=${this._navigate} class=${isActive('/')}>🏠 Home</a>
        <a
          href="/dashboard"
          @click=${this._navigate}
          class=${isActive('/dashboard')}
          >📊 Dashboard</a
        >
        <a
          href="/histori"
          @click=${this._navigate}
          class=${isActive('/histori')}
          >📈 Histori</a
        >
      </nav>
      <div id="outlet" class="p-4"></div>
    `;
  }

  private _navigate(e: Event) {
    e.preventDefault();
    const anchor = e.currentTarget as HTMLAnchorElement;
    const path = anchor.getAttribute('href');
    if (path && path !== this.currentPath) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      this.currentPath = path;
    }
  }
}
