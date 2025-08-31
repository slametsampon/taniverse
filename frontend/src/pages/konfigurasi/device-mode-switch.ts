// frontend/src/pages/konfigurasi/device-mode-switch.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DeviceUI } from './device-ui';

@customElement('device-mode-switch')
export class DeviceModeSwitch extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'edit' | 'new' = 'edit';

  render() {
    return html`
      <div
        class="inline-flex items-center gap-1 rounded-lg bg-slate-100/80 p-1 shadow-inner ring-1 ring-slate-200"
        role="group"
        aria-label="Switch form mode"
      >
        <button
          class="${DeviceUI.btnCls(this.mode === 'edit')}"
          aria-pressed="${this.mode === 'edit'}"
          title="Edit device yang sudah ada"
          @click=${() => this._changeMode('edit')}
        >
          <span class="inline-flex items-center gap-2">
            <span aria-hidden="true">✏️</span>
            <span>Edit</span>
          </span>
          ${this.mode === 'edit'
            ? html`<span
                class="absolute -bottom-1.5 left-2 right-2 h-0.5 rounded bg-indigo-500"
              ></span>`
            : null}
        </button>

        <button
          class="${DeviceUI.btnCls(this.mode === 'new')}"
          aria-pressed="${this.mode === 'new'}"
          title="Buat device baru"
          @click=${() => this._changeMode('new')}
        >
          <span class="inline-flex items-center gap-2">
            <span aria-hidden="true">🆕</span>
            <span>New</span>
          </span>
          ${this.mode === 'new'
            ? html`<span
                class="absolute -bottom-1.5 left-2 right-2 h-0.5 rounded bg-indigo-500"
              ></span>`
            : null}
        </button>
      </div>
    `;
  }

  private _changeMode(mode: 'edit' | 'new') {
    this.dispatchEvent(
      new CustomEvent('dev-mode-change', {
        detail: { mode },
        bubbles: true,
        composed: true,
      })
    );
  }
}
