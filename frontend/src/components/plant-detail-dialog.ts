import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Plant } from '../../../models/plant.model';

@customElement('plant-detail-dialog')
export class PlantDetailDialog extends LitElement {
  @property({ type: Object }) plant!: Plant;
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
    if (!this.visible) return html``;

    return html`
      <div
        class="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-50"
        @click=${() => this.close()}
      >
        <div
          class="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          <div class="flex justify-between items-center mb-4">
            <div class="text-lg font-bold">Detail Tanaman</div>
            <button
              @click=${() => this.close()}
              class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              title="Tutup"
            >
              ✕
            </button>
          </div>

          <table class="w-full text-sm">
            <tbody>
              ${Object.entries(this.plant || {}).map(
                ([key, value]) => html`
                  <tr class="border-b">
                    <td class="py-1 px-2 font-medium text-gray-600 w-1/3">
                      ${this.formatKey(key)}
                    </td>
                    <td class="py-1 px-2">${this.renderValue(value)}</td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private formatDate(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return value.toString(); // fallback

    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
      return this.formatDate(value);
    }

    if (value instanceof Date) {
      return this.formatDate(value);
    }

    if (typeof value === 'object') {
      return html`<pre class="text-xs bg-gray-100 p-2 rounded">
${JSON.stringify(value, null, 2)}</pre
      >`;
    }

    return value.toString();
  }
}
