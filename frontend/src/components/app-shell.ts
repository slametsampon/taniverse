// frontend/src/components/app-shell.ts
import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { provide } from '@lit/context';

import './app-header.ts';
import './app-footer.ts';
import './app-main.ts';
import { AuthService } from '../services/auth-service.js';
import { themeContext, Theme } from '../context/theme-context';

@customElement('app-shell')
export class AppShell extends LitElement {
  createRenderRoot() {
    return this;
  }

  private readonly basePath =
    window.location.hostname === '127.0.0.1' ? '/' : '/taniverse/';

  @state() private currentPath = window.location.pathname;
  @state() private theme: Theme = 'light';

  @provide({ context: themeContext })
  private providedTheme: Theme = 'light';

  @query('app-main') private appMainEl!: HTMLElement & {
    navigate: (path: string) => void;
  };

  connectedCallback() {
    super.connectedCallback();

    // Load from localStorage or match system
    const saved = localStorage.getItem('theme') as Theme | null;
    this.theme =
      saved ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    this.providedTheme = this.theme;
    this._applyTheme();

    window.addEventListener('popstate', this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    super.disconnectedCallback();
  }

  private _toggleTheme = () => {
    console.log('[app-shell] toggle-theme event received');
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.providedTheme = this.theme;
    console.log('[app-shell] Theme switched to:', this.theme);
    this._applyTheme();
  };

  private _applyTheme() {
    const isDark = this.theme === 'dark';

    // ✅ Tambahkan class 'light' saat bukan dark
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);

    document.body.classList.remove(
      'bg-white',
      'bg-gray-100',
      'text-black',
      'text-white',
      'dark:bg-gray-950'
    );
    document.body.classList.add(
      isDark ? 'bg-gray-950' : 'bg-white',
      isDark ? 'text-white' : 'text-black'
    );

    localStorage.setItem('theme', this.theme);
    console.log('[app-shell] Applying theme:', this.theme);
    console.log(
      '[app-shell] <html> classList:',
      document.documentElement.className
    );
  }

  private _onPopState = () => {
    this.currentPath = window.location.pathname;
  };

  private _onNavChanged = (e: CustomEvent<{ path: string }>) => {
    const rawPath = e.detail.path.replace(/^\/+/, '');
    const target = `/${rawPath}`;
    this.appMainEl?.navigate(target);
  };

  private _onLoginClick = () => this.appMainEl?.navigate('/login');
  private _onLogoutClick = () => {
    AuthService.logout();
    this.appMainEl?.navigate('/');
    this.requestUpdate();
  };
  private _onProfileClick = () => this.appMainEl?.navigate('/dashboard');

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
        @toggle-theme=${this._toggleTheme}
      ></app-header>

      <app-main
        .basePath=${this.basePath}
        @route-changed=${(ev: CustomEvent<{ path: string }>) => {
          this.currentPath = ev.detail.path;
        }}
        @navigate-to=${this._onNavigateTo}
        @auth-changed=${this._onAuthChanged}
      ></app-main>

      <app-footer></app-footer>
    `;
  }
}
