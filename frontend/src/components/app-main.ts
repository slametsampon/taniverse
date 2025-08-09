// frontend/src/components/app-main.ts
import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

import '../pages/home.ts'; // pre-load halaman home (opsional)

@customElement('app-main')
export class AppMain extends LitElement {
  // light DOM agar styling global (Tailwind) tetap nempel
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) basePath: string = '/';
  @state() private currentPath = window.location.pathname;

  @query('#outlet') private outletEl!: HTMLElement;
  private router!: Router;

  firstUpdated() {
    this.router = new Router(this.outletEl, { baseUrl: this.basePath });

    this.router.setRoutes([
      {
        path: '/login',
        action: async () => {
          await import('../pages/login');
        },
        component: 'page-login',
      },
      {
        path: '/dashboard',
        action: async () => {
          await import('../pages/dashboard');
        },
        component: 'page-dashboard',
      },
      {
        path: '/histori',
        action: async () => {
          await import('../pages/histori');
        },
        component: 'page-histori',
      },
      {
        path: '/about',
        action: async () => {
          await import('../pages/about');
        },
        component: 'page-about',
      },
      { path: '/', component: 'page-home' },
      {
        path: '(.*)',
        action: async () => {
          await import('../pages/not-found');
        },
        component: 'page-not-found',
      },
    ]);

    window.addEventListener('popstate', this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    super.disconnectedCallback();
  }

  private _onPopState = () => {
    this.currentPath = window.location.pathname;
    this.dispatchEvent(
      new CustomEvent('route-changed', {
        detail: { path: this.currentPath },
        bubbles: true,
        composed: true,
      })
    );
  };

  // Dipanggil oleh app-shell saat nav berubah
  public navigate = (path: string) => {
    // Router.go akan mengurus pushState + matching
    const full =
      this.basePath === '/'
        ? path
        : `${this.basePath}${path.replace(/^\/+/, '')}`;
    Router.go(full);
  };

  render() {
    return html`
      <main class="max-w-7xl mx-auto px-4 py-6 pb-16">
        <div id="outlet" class="p-4"></div>
      </main>
    `;
  }
}
