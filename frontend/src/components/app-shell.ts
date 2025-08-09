import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';

import './app-header.ts';
import './app-footer.ts';
import './app-main.ts';

@customElement('app-shell')
export class AppShell extends LitElement {
  // gunakan light DOM agar Tailwind global tetap berlaku
  createRenderRoot() {
    return this;
  }

  // Tentukan basePath untuk local dan GitHub Pages
  private readonly basePath =
    window.location.hostname === '127.0.0.1' ? '/' : '/taniverse/';

  @state() private currentPath = window.location.pathname;

  @query('app-main') private appMainEl!: HTMLElement & {
    navigate: (path: string) => void;
  };

  connectedCallback() {
    super.connectedCallback();
    // sinkronkan state saat user tekan tombol back/forward
    window.addEventListener('popstate', this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    super.disconnectedCallback();
  }

  private _onPopState = () => {
    this.currentPath = window.location.pathname;
  };

  // Dari app-header: { detail: { path: '/dashboard' } }
  private _onNavChanged = (e: CustomEvent<{ path: string }>) => {
    const rawPath = e.detail.path.replace(/^\/+/, '');
    const target = `/${rawPath}`;
    // delegasikan ke app-main agar router yang handle (lebih bersih daripada pushState manual)
    this.appMainEl?.navigate(target);
  };

  render() {
    return html`
      <app-header
        .currentPath=${this.currentPath}
        @nav-changed=${this._onNavChanged}
      >
      </app-header>

      <app-main
        .basePath=${this.basePath}
        @route-changed=${(ev: CustomEvent<{ path: string }>) => {
          this.currentPath = ev.detail.path;
        }}
      >
      </app-main>

      <app-footer></app-footer>
    `;
  }
}
