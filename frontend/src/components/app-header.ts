import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './app-nav'; // pastikan komponen nav ada
import './user-info'; // komponen user login

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) currentPath: string = window.location.pathname;

  // pakai light DOM agar Tailwind/Global CSS tetap nempel
  createRenderRoot() {
    return this;
  }

  private _onNavChanged(e: CustomEvent) {
    // teruskan event ke parent (app-main)
    this.dispatchEvent(
      new CustomEvent('nav-changed', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <header
        class="w-full sticky top-0 z-50 bg-green-100 shadow-sd backdrop-blur border-b"
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
            username="John Doe"
            avatarUrl="https://i.pravatar.cc/100"
            .isLoggedIn=${true}
          ></user-info>
        </div>
      </header>
    `;
  }
}
