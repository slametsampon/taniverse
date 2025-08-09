import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer
        class="fixed bottom-0 left-0 w-full border-t border-slate-200 bg-white z-50"
      >
        <div
          class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-slate-600"
        >
          <div>
            © ${new Date().getFullYear()} Taniverse. All rights reserved.
          </div>
          <div class="flex items-center gap-4">
            <a
              class="hover:underline"
              href="https://github.com/slametsampon/taniverse"
              target="_blank"
              rel="noreferrer"
              >GitHub</a
            >
            <a class="hover:underline" href="/about">About</a>
          </div>
        </div>
      </footer>
    `;
  }
}
