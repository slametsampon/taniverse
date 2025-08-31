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
      <div class="flex gap-2 pt-2 text-sm">
        <button
          class="flex items-center gap-1 px-4 py-1 bg-green-600 text-white rounded"
          @click=${() => this.emit('submit')}
        >
          <i data-lucide="check-circle" class="w-4 h-4"></i> Submit
        </button>

        <button
          class="flex items-center gap-1 px-4 py-1 bg-gray-500 text-white rounded"
          @click=${() => this.emit('cancel')}
        >
          <i data-lucide="x-circle" class="w-4 h-4"></i> Cancel
        </button>

        ${this.mode === 'edit'
          ? html`
              <button
                class="flex items-center gap-1 px-4 py-1 bg-red-600 text-white rounded"
                @click=${() => this.emit('delete')}
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i> Delete
              </button>
            `
          : null}
      </div>
    `;
  }
}
