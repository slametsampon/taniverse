// frontend/src/pages/konfigurasi/views/batch/form-batch-akuakultur.ts

import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import '../../components/generic-batch-form'; // ✅ Ganti form
import { aquaticBatchFields } from '../../schema/aquatic-batch-fields';
@customElement('form-batch-akuakultur')
export class ViewProdAkuakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';
  @property({ type: Object }) value: Record<string, any> = {};
  @property({ type: String }) kind!:
    | 'akuakultur'
    | 'hidroponik'
    | 'hortikultura'
    | 'peternakan'; // ✅ TAMBAH

  connectedCallback() {
    super.connectedCallback();
    console.log(
      '[FORM AKUAKULTUR] mounted with kind, value :',
      this.kind,
      this.value
    );
  }

  private toggleMode(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.mode = target.value as 'new' | 'edit';

    // contoh dummy data saat edit
    if (this.mode === 'edit') {
      this.value = {
        id: 'AQUA-001',
        speciesId: 'LELE001',
        code: 'AQ-2025-B1',
        pond: 'Kolam-B1',
        initialPopulation: 1000,
        currentPopulation: 950,
        startDate: '2025-08-15',
        expectedHarvestDate: '2025-11-01',
        length: 400,
        width: 200,
        height: 120,
        note: 'Pertumbuhan baik, penggantian air mingguan.',
      };
    } else {
      this.value = {};
    }
  }

  private handleSubmit(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCancel() {
    console.log('🚫 Batal input akuakultur');
  }

  private handleDelete(e: CustomEvent) {
    const id = e.detail;
    console.log('🗑️ Hapus batch akuakultur dengan ID:', id);
  }

  render() {
    return html`
      <div class="p-4 space-y-6">
        <h2 class="text-xl font-semibold text-blue-700">
          Manajemen Batch Akuakultur
        </h2>

        <!-- Mode Switcher -->
        <div class="mb-4">
          <label class="block text-sm text-gray-700 mb-1">Mode Operasi</label>
          <select
            class="px-3 py-1 border rounded bg-white"
            .value=${this.mode}
            @change=${this.toggleMode}
          >
            <option value="new">Tambah Baru</option>
            <option value="edit">Edit Data</option>
          </select>
        </div>

        <!-- ✅ Gunakan generic form dengan field config -->
        <generic-batch-form
          .mode=${this.mode}
          .fields=${aquaticBatchFields}
          .value=${this.value}
          .kind=${this.kind}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-batch-form>
      </div>
    `;
  }
}
