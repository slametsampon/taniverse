// frontend/src/pages/konfigurasi/views/produksi/view-prod-hidroponik.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../components/generic-batch-form'; // ✅ gunakan form generik
import { hydroponicBatchFields } from '../../components/hydroponic-batch-fields';

@customElement('view-prod-hidroponik')
export class ViewProdHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private formMode: 'new' | 'edit' = 'new';
  @state() private batchValue: Record<string, any> = {}; // nilai untuk form (edit/new)

  private toggleMode(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.formMode = target.value as 'new' | 'edit';

    // contoh dummy data untuk mode edit
    if (this.formMode === 'edit') {
      this.batchValue = {
        id: 'BATCH001',
        plantId: 'TOM001',
        code: 'HYP-2025-A1',
        system: 'NFT',
        location: 'Rak-1A',
        initialCount: 20,
        currentCount: 18,
        startDate: '2025-09-01',
        expectedHarvestDate: '2025-10-01',
        length: 120,
        width: 60,
        height: 30,
        note: 'Pemupukan ke-2',
      };
    } else {
      this.batchValue = {};
    }
  }

  private handleSubmit(e: CustomEvent) {
    const data = e.detail;
    console.log('📝 SUBMIT DATA:', data);
    // TODO: Simpan ke backend atau kirim via MQTT
  }

  private handleCancel() {
    console.log('❌ Batal input');
  }

  private handleDelete(e: CustomEvent) {
    const id = e.detail;
    console.log('🗑️ Hapus batch dengan ID:', id);
  }

  render() {
    return html`
      <div class="p-4 space-y-6">
        <h2 class="text-xl font-semibold text-green-700">
          Manajemen Batch Hidroponik
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

        <!-- ✅ Gunakan generic-batch-form -->
        <generic-batch-form
          .mode=${this.formMode}
          .fields=${hydroponicBatchFields}
          .value=${this.batchValue}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-batch-form>
      </div>
    `;
  }
}
