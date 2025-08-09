// frontend/src/pages/login.ts
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthService } from '../components/auth-service';

@customElement('page-login')
export class PageLogin extends LitElement {
  @state() private username = '';
  @state() private password = '';
  @state() private loading = false;
  @state() private error = '';

  static styles = css`
    :host {
      display: block;
    }
  `;
  firstUpdated() {
    this.username = 'admin';
    this.password = 'admin123';
  }
  createRenderRoot() {
    return this;
  } // gunakan Tailwind global

  private async onSubmit(e: Event) {
    e.preventDefault();
    this.error = '';
    this.loading = true;
    try {
      console.log('login', this.username, this.password);
      const user = await AuthService.login(this.username.trim(), this.password);
      // beri tahu app bahwa login sukses
      this.dispatchEvent(
        new CustomEvent('auth-changed', {
          detail: { user },
          bubbles: true,
          composed: true,
        })
      );
      // minta router kembali ke beranda
      this.dispatchEvent(
        new CustomEvent('navigate-to', {
          detail: { path: '/' },
          bubbles: true,
          composed: true,
        })
      );
    } catch (err: any) {
      this.error = err?.message ?? 'Login gagal.';
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="min-h-[60vh] flex items-center justify-center">
        <form
          class="w-full max-w-sm p-6 rounded-2xl border shadow-sm bg-white"
          @submit=${this.onSubmit}
        >
          <h1 class="text-xl font-semibold mb-4">Masuk</h1>

          ${this.error
            ? html` <div
                class="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-2"
              >
                ${this.error}
              </div>`
            : null}

          <label class="block mb-2 text-sm font-medium">Username</label>
          <input
            class="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            autocomplete="username"
            .value=${this.username}
            @input=${(e: any) => (this.username = e.target.value)}
          />

          <label class="block mb-2 text-sm font-medium">Password</label>
          <input
            class="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            type="password"
            autocomplete="current-password"
            .value=${this.password}
            @input=${(e: any) => (this.password = e.target.value)}
          />

          <button
            class="w-full py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
            ?disabled=${this.loading || !this.username || !this.password}
            type="submit"
          >
            ${this.loading ? 'Memproses…' : 'Login'}
          </button>
        </form>
      </div>
    `;
  }
}
