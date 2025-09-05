// frontend/src/components/form-builder-group.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('form-builder-group')
export class FormBuilderGroup extends LitElement {
  createRenderRoot() {
    return this; // Light DOM
  }

  @property({ type: Number }) cols = 2;
  @property({ type: String }) gap = 'gap-4';
  @property({ type: String }) className = '';

  private get colsClass(): string {
    const map: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };
    return map[this.cols] ?? 'grid-cols-2';
  }

  render() {
    return html`
      <div class="grid ${this.colsClass} ${this.gap} ${this.className}">
        <slot></slot>
      </div>
    `;
  }
}
