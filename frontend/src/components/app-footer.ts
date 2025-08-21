import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer>
        <div class="container">
          <div>
            © ${new Date().getFullYear()} Taniverse. All rights reserved.
          </div>
          <div>
            <a href="https://github.com/slametsampon/taniverse" target="_blank"
              >GitHub</a
            >
            <a href="/about">About</a>
          </div>
        </div>
      </footer>
    `;
  }
}
