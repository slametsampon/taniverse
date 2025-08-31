// frontend/src/components/dialogs/livestock-detail-dialog.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Livestock } from '@models/livestock.model';
import { formatDate } from '../../utils/format-display';

@customElement('livestock-detail-dialog')
export class LivestockDetailDialog extends LitElement {
  @property({ type: Object }) livestock: Livestock | null = null;
  @property({ type: Boolean }) visible = false;

  createRenderRoot() {
    return this;
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  render() {
    if (!this.visible || !this.livestock) return html``;

    return html`
      <div
        class="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
        @click=${this.close}
      >
        <div
          class="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">🐔 Detail Ternak</h2>
            <button
              @click=${this.close}
              class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              title="Tutup"
            >
              ✕
            </button>
          </div>

          <table class="w-full text-sm">
            <tbody>
              ${Object.entries(this.livestock).map(
                ([key, value]) => html`
                  <tr class="border-b">
                    <td class="py-1 px-2 font-medium text-gray-600 w-1/3">
                      ${this.formatKey(key)}
                    </td>
                    <td class="py-1 px-2 break-words">
                      ${this.renderValue(value)}
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private formatKey(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  private renderValue(value: any): unknown {
    if (value === null || value === undefined) return '-';

    // Deteksi ISO date string
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      return formatDate(value);
    }

    if (value instanceof Date) {
      return formatDate(value);
    }

    if (typeof value === 'object') {
      return html`<pre class="text-xs bg-gray-100 p-2 rounded">
${JSON.stringify(value, null, 2)}</pre
      >`;
    }

    return value.toString();
  }
}
