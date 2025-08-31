// frontend/src/components/ui/ui-tabs.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-tabs')
export class UiTabs<T extends string = string> extends LitElement {
  @property({ type: Array })
  tabs: { id: T; label: string; icon?: string }[] = [];

  @property({ attribute: false })
  active: T = '' as T;

  @property({ attribute: false })
  badges: Partial<Record<T, number>> = {};

  createRenderRoot() {
    return this; // <-- gunakan Light DOM
  }

  private onClick(id: T) {
    this.dispatchEvent(
      new CustomEvent('dev-tab-change', {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <nav class="border-b border-slate-200 bg-white rounded-t-md">
        <ul class="flex flex-row items-center gap-2 -mb-px px-2 list-none">
          ${this.tabs.map((t) => {
            const isActive = t.id === this.active;
            const badge = this.badges[t.id] ?? 0;

            return html`
              <li>
                <button
                  class="${[
                    'px-4 py-2 text-sm rounded-t-md border transition',
                    'inline-flex items-center gap-2',
                    isActive
                      ? 'bg-slate-100 text-slate-900 border-slate-300 border-b-white'
                      : 'border-transparent text-slate-500 hover:bg-slate-50',
                  ].join(' ')}"
                  @click=${() => this.onClick(t.id)}
                >
                  ${t.icon ? html`<span>${t.icon}</span>` : null}
                  <span>${t.label}</span>
                  ${badge > 0
                    ? html`
                        <span
                          class="ml-1 grid place-items-center w-5 h-5 rounded-full bg-red-500 text-white text-xs"
                          >${badge}</span
                        >
                      `
                    : null}
                </button>
              </li>
            `;
          })}
        </ul>
      </nav>
    `;
  }
}
