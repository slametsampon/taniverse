// frontend/src/pages/konfigurasi/view-prod-akuakultur.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../../../components/aquatic-batch-form';

@customElement('view-prod-akuakultur')
export class ViewProdAkuakultur extends LitElement {
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
        <h2 class="text-xl font-semibold text-blue-700">
          Manajemen Batch Akuakultur
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

        <aquatic-batch-form .mode=${this.formMode}></aquatic-batch-form>
      </div>
    `;
  }
}
