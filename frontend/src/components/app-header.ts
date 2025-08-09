// frontend/src/components/app-header.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './app-nav';
import './user-info';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) currentPath: string = window.location.pathname;

  // state user dikirim dari app-shell
  @property({ type: String }) username = 'Guest';
  @property({ type: String }) avatarUrl = '';
  @property({ type: Boolean }) isLoggedIn = false;

  // pakai light DOM agar Tailwind/Global CSS tetap nempel
  createRenderRoot() {
    return this;
  }

  private _onNavChanged(e: CustomEvent) {
    // teruskan event ke parent (app-shell)
    this.dispatchEvent(
      new CustomEvent('nav-changed', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _forward(type: 'login-click' | 'logout-click' | 'profile-click') {
    this.dispatchEvent(
      new CustomEvent(type, { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <header
        class="w-full sticky top-0 z-50 bg-green-100 shadow-sm backdrop-blur border-b"
      >
        <div class="mx-auto px-4 flex items-center justify-between">
          <!-- Kiri: Navigation -->
          <app-nav
            class="flex-grow"
            .currentPath=${this.currentPath}
            @nav-changed=${this._onNavChanged}
          ></app-nav>

          <!-- Kanan: User Login Info -->
          <user-info
            .username=${this.username}
            .avatarUrl=${this.avatarUrl}
            .isLoggedIn=${this.isLoggedIn}
            @login-click=${() => this._forward('login-click')}
            @logout-click=${() => this._forward('logout-click')}
            @profile-click=${() => this._forward('profile-click')}
          ></user-info>
        </div>
      </header>
    `;
  }
}
