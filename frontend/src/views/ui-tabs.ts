import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type TabId = 'general' | 'hw-comm' | 'loc-meta';
type BadgeMap = Partial<Record<TabId, number>>;

@customElement('ui-tabs')
export class UiTabs extends LitElement {
  // Tailwind global → light DOM
  createRenderRoot() {
    return this;
  }

  @property({ attribute: false }) tabs: {
    id: TabId;
    label: string;
    icon?: string;
  }[] = [];
  @property() active: TabId = 'general';
  @property({ attribute: false }) badges: BadgeMap = {};

  private onClick(id: TabId) {
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
        <ul class="flex gap-2 -mb-px px-2">
          ${this.tabs.map((t) => {
            const is = t.id === this.active;
            const badge = this.badges[t.id] ?? 0;
            return html`
              <li>
                <button
                  class="px-4 py-2 text-sm rounded-t-md border transition
                         ${is
                    ? 'bg-white border-slate-300 border-b-white'
                    : 'border-transparent hover:bg-slate-50'}
                         inline-flex items-center gap-2"
                  @click=${() => this.onClick(t.id)}
                >
                  ${t.icon ? html`<span>${t.icon}</span>` : null}
                  <span>${t.label}</span>
                  ${badge > 0
                    ? html`<span
                        class="ml-1 grid place-items-center w-5 h-5 rounded-full bg-red-500 text-white text-xs"
                        >${badge}</span
                      >`
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
