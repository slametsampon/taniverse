// frontend/src/components/crud-buttons.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crud-buttons')
export class CrudButtons extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';

  emit(event: string) {
    this.dispatchEvent(
      new CustomEvent(event, { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <div class="flex flex-wrap gap-3 pt-4">
        <button
          class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition cursor-pointer"
          @click=${() => this.emit('submit')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="text-sm font-semibold">Submit</span>
        </button>

        <button
          class="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition cursor-pointer"
          @click=${() => this.emit('cancel')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span class="text-sm font-semibold">Cancel</span>
        </button>

        ${this.mode === 'edit'
          ? html`
              <button
                class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition cursor-pointer"
                @click=${() => this.emit('delete')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7L5 7M10 11v6m4-6v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"
                  />
                </svg>
                <span class="text-sm font-semibold">Delete</span>
              </button>
            `
          : null}
      </div>
    `;
  }
}
