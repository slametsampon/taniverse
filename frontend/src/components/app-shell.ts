// frontend/src/components/app-shell.ts
import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';

import './app-header.ts';
import './app-footer.ts';
import './app-main.ts';
import { AuthService } from '../services/auth-service.js';

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

  // Event dari user-info (dikirim lewat app-header)
  private _onLoginClick = () => this.appMainEl?.navigate('/login');
  private _onLogoutClick = () => {
    AuthService.logout();
    this.appMainEl?.navigate('/');
    this.requestUpdate(); // refresh header props
  };
  private _onProfileClick = () => this.appMainEl?.navigate('/dashboard');

  // Event dari page-login
  private _onNavigateTo = (e: CustomEvent<{ path: string }>) =>
    this.appMainEl?.navigate(e.detail.path);
  private _onAuthChanged = () => this.requestUpdate();

  render() {
    return html`
      <app-header
        .currentPath=${this.currentPath}
        .username=${AuthService.getUser()?.username ?? 'Guest'}
        .avatarUrl=${AuthService.getUser()?.avatarUrl ?? ''}
        .isLoggedIn=${AuthService.isLoggedIn()}
        @nav-changed=${this._onNavChanged}
        @login-click=${this._onLoginClick}
        @logout-click=${this._onLogoutClick}
        @profile-click=${this._onProfileClick}
      >
      </app-header>

      <app-main
        .basePath=${this.basePath}
        @route-changed=${(ev: CustomEvent<{ path: string }>) => {
          this.currentPath = ev.detail.path;
        }}
        @navigate-to=${this._onNavigateTo}
        @auth-changed=${this._onAuthChanged}
      >
      </app-main>

      <app-footer></app-footer>
    `;
  }
}
