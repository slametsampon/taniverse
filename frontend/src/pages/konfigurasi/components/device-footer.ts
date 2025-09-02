// frontend/src/pages/konfigurasi/device-footer.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('device-footer')
export class DeviceFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Boolean }) saving = false;
  @property({ type: Boolean }) deleting = false;
  @property({ type: Boolean }) dirty = false;
  @property({ type: Number }) errors = 0;
  @property({ type: String }) mode: 'edit' | 'new' = 'edit';

  render() {
    const disabled = this.saving || this.deleting;

    return html`
      <div
        class="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-4 p-3 flex gap-2 justify-end"
      >
        <button
          class="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click=${() => this._emit('back')}
          ?disabled=${disabled}
        >
          Kembali
        </button>

        <button
          class="px-3 py-2 rounded bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click=${() => this._emit('reset')}
          ?disabled=${disabled}
        >
          Cancel
        </button>

        ${this.mode === 'edit'
          ? html`
              <button
                class="relative px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                @click=${() => this._emit('delete')}
                ?disabled=${disabled}
                title="Hapus device ini"
              >
                ${this.deleting
                  ? html`<span class="inline-flex items-center gap-2">
                      <svg
                        class="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-30"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          fill="none"
                        ></circle>
                        <path
                          class="opacity-90"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 1 8-8v4A4 4 0 0 0 8 12H4z"
                        ></path>
                      </svg>
                      Deleting…
                    </span>`
                  : html`Delete`}
              </button>
            `
          : null}

        <button
          class="relative px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          @click=${() => this._emit('save')}
          ?disabled=${disabled ||
          this.errors > 0 ||
          (!this.dirty && this.mode === 'edit')}
          title=${this.errors
            ? 'Perbaiki error dulu'
            : this.saving
            ? 'Saving...'
            : 'Save'}
        >
          ${this.saving
            ? html`<span class="inline-flex items-center gap-2">
                <svg
                  class="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-30"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  ></circle>
                  <path
                    class="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8v4A4 4 0 0 0 8 12H4z"
                  ></path>
                </svg>
                Saving…
              </span>`
            : html`Save`}
        </button>

        ${this.dirty
          ? html`<span class="self-center text-xs text-amber-600"
              >unsaved changes…</span
            >`
          : null}
      </div>
    `;
  }

  private _emit(action: 'save' | 'reset' | 'delete' | 'back') {
    this.dispatchEvent(
      new CustomEvent(`dev-${action}`, {
        bubbles: true,
        composed: true,
      })
    );
  }
}
