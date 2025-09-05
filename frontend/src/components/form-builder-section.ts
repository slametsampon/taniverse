// frontend/src/components/form-builder-section.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('form-builder-section')
export class FormBuilderSection extends LitElement {
  createRenderRoot() {
    return this; // Light DOM: agar Tailwind & grid inheritance tetap jalan
  }

  @property({ type: String }) title = '';
  @property({ type: String }) desc = '';

  render() {
    return html`
      <div class="mb-6">
        ${this.title
          ? html`<h2 class="text-lg font-semibold text-gray-800 mb-1">
              ${this.title}
            </h2>`
          : null}
        ${this.desc
          ? html`<p class="text-sm text-gray-600 mb-2">${this.desc}</p>`
          : null}

        <div class="space-y-4">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
