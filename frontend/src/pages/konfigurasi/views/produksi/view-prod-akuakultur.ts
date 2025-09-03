// frontend/src/pages/konfigurasi/views/produksi/view-prod-akuakultur.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../components/generic-batch-form'; // ✅ Ganti form
import { aquaticBatchFields } from '../../components/aquatic-batch-fields';
@customElement('view-prod-akuakultur')
export class ViewProdAkuakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private formMode: 'new' | 'edit' = 'new';
  @state() private batchValue: Record<string, any> = {};

  private toggleMode(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.formMode = target.value as 'new' | 'edit';

    // contoh dummy data saat edit
    if (this.formMode === 'edit') {
      this.batchValue = {
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
      this.batchValue = {};
    }
  }

  private handleSubmit(e: CustomEvent) {
    const data = e.detail;
    console.log('✅ SUBMIT BATCH AKUAKULTUR:', data);
    // TODO: Integrasi dengan backend atau MQTT publish
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
            .value=${this.formMode}
            @change=${this.toggleMode}
          >
            <option value="new">Tambah Baru</option>
            <option value="edit">Edit Data</option>
          </select>
        </div>

        <!-- ✅ Gunakan generic form dengan field config -->
        <generic-batch-form
          .mode=${this.formMode}
          .fields=${aquaticBatchFields}
          .value=${this.batchValue}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-batch-form>
      </div>
    `;
  }
}
