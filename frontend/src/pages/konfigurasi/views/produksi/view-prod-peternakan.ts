// frontend/src/pages/konfigurasi/views/produksi/view-prod-peternakan.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../batch/livestock-batch-form';

@customElement('view-prod-peternakan')
export class ViewProdPeternakan extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state()
  private formMode: 'new' | 'edit' = 'new';

  private toggleMode(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.formMode = target.value as 'new' | 'edit';
  }

  render() {
    return html`
      <div class="p-4 space-y-6">
        <h2 class="text-xl font-semibold text-green-700">
          Manajemen Batch Peternakan (Ayam)
        </h2>

        <div class="mb-4">
          <label class="block text-sm text-gray-700 mb-1">Mode Operasi</label>
          <select
            class="px-3 py-1 border rounded bg-white"
            .value=${this.formMode}
            @change=${this.toggleMode}
          >
            <option value="new">Tambah Baru</option>
            <option value="edit">Edit Data</option>
          </select>
        </div>

        <livestock-batch-form .mode=${this.formMode}></livestock-batch-form>
      </div>
    `;
  }
}
