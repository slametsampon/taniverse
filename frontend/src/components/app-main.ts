import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

import './app-nav.ts'; // import komponen navigasi
import '../pages/home.ts';
import '../pages/dashboard.ts';
import '../pages/histori.ts';
import '../pages/not-found.ts';
import '../pages/about.ts';

@customElement('app-main')
export class AppMain extends LitElement {
  @state() private currentPath = window.location.pathname;

  // Tentukan basePath untuk local dan GitHub Pages
  private basePath =
    window.location.hostname === '127.0.0.1' ? '/' : '/taniverse/';

  createRenderRoot() {
    console.log('window.location.pathname : ', window.location.pathname);
    console.log('window.location.hostname : ', window.location.hostname);

    return this;
  }

  firstUpdated() {
    const outlet = document.getElementById('outlet');

    const router = new Router(outlet!, {
      baseUrl: this.basePath,
    });

    router.setRoutes([
      { path: '/', component: 'page-home' },
      { path: '/dashboard', component: 'page-dashboard' },
      { path: '/histori', component: 'page-histori' },
      { path: '/about', component: 'page-about' },
      { path: '(.*)', component: 'page-not-found' },
    ]);

    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
    });
  }

  private _onNavChanged(e: CustomEvent) {
    const rawPath = e.detail.path;
    const newPath = this.basePath + rawPath.replace(/^\/+/, ''); // gabungkan basePath + path
    window.history.pushState({}, '', newPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    this.currentPath = newPath;
  }

  render() {
    return html`
      <app-nav
        .currentPath=${this.currentPath}
        @nav-changed=${this._onNavChanged}
      ></app-nav>
      <div id="outlet" class="p-4"></div>
    `;
  }
}
