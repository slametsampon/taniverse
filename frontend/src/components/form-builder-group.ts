// frontend/src/components/form-builder-group.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('form-builder-group')
export class FormBuilderGroup extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Number }) cols = 2;
  @property({ type: String }) gap = 'gap-4';
  @property({ type: String }) className = '';

  @property({ type: Array }) fields: any[] = [];
  @property({ type: Object }) model: any = {};
  @property({ type: Object }) errors: Record<string, string> = {};
  @property({ type: Function }) onFieldChange!: (e: Event, key: string) => void;

  private get colsClass(): string {
    const map: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };
    return map[this.cols] ?? 'grid-cols-2';
  }

  private getNestedValue(obj: any, path: string): any {
    return path
      .split('.')
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }

  render() {
.................................................................................................    return html`
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-1">${this.title}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${this.fields.map((field: any) => {
            const val = this.getNestedValue(this.model, field.key);
            const err = this.getNestedValue(this.errors, field.key) ?? '';

            return html`
              <form-builder-field
                .field=${field}
                .value=${val}
                .inputId=${`fld-${field.key}`}
                .error=${err}
                .onInput=${this.onFieldChange}
              ></form-builder-field>
            `;
          })}
        </div>
      </div>
    `;
  }
}
