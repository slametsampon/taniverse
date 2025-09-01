// frontend/src/components/dialogs/entity-detail-dialog.ts
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { formatKey } from '../../utils/format-display';

// ==== SAFE formatter: hindari ubah angka/string menjadi "--" ====
function formatValueSafe(v: any) {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : '—';
  if (typeof v === 'string') return v.trim() === '' ? '—' : v;
  if (Array.isArray(v)) return v.length ? JSON.stringify(v) : '[]';
  if (typeof v === 'object')
    return Object.keys(v).length ? JSON.stringify(v) : '{}';
  return String(v);
}

type Section = [title: string, data: Record<string, any>];

@customElement('entity-detail-dialog')
export class EntityDetailDialog extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private visible = false;
  @state() private dlgTitle = 'Detail';
  @state() private sections: Section[] = [];

  // Terima: show(obj) atau show({ A: obj1, B: obj2 }, 'Title')
  show(
    data: Record<string, any> | Record<string, Record<string, any>>,
    title = 'Detail'
  ) {
    this.dlgTitle = title;

    const isPlain = (v: any) => v && typeof v === 'object' && !Array.isArray(v);
    if (isPlain(data) && Object.values(data).every(isPlain)) {
      this.sections = Object.entries(data) as Section[];
    } else if (isPlain(data)) {
      this.sections = [['Detail', data as Record<string, any>]];
    } else {
      console.warn('[entity-detail-dialog] show() tipe tidak didukung:', data);
      this.sections = [];
    }

    // === DIAGNOSTIC ===
    console.groupCollapsed('[entity-detail-dialog] show() payload');
    console.log('title:', this.dlgTitle);
    this.sections.forEach(([t, o]) => {
      console.log(`section: ${t}`, {
        keys: Object.keys(o),
        sample: Object.entries(o).slice(0, 5),
      });
    });
    console.groupEnd();

    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  private renderSection(title: string, obj: Record<string, any>) {
    const entries = Object.entries(obj ?? {});
    if (!entries.length) {
      return html`
        <div class="mt-4">
          <h3 class="font-semibold text-base mb-1">${title}</h3>
          <div class="text-sm italic text-gray-500">Tidak ada data.</div>
        </div>
      `;
    }
    return html`
      <div class="mt-4">
        <h3 class="font-semibold text-base mb-1">${title}</h3>
        <table class="w-full text-sm mb-2">
          <tbody>
            ${entries.map(
              ([key, val]) => html`
                <tr class="border-b">
                  <td class="py-1 px-2 font-medium text-gray-600 w-1/3">
                    ${formatKey(key)}
                  </td>
                  <td class="py-1 px-2">${formatValueSafe(val)}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  render() {
    if (!this.visible) return html``;
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
            <div class="text-lg font-bold">${this.dlgTitle}</div>
            <button
              class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full"
              @click=${this.close}
              title="Tutup"
            >
              ✕
            </button>
          </div>
          ${this.sections.map(([t, o]) => this.renderSection(t, o))}
        </div>
      </div>
    `;
  }
}
