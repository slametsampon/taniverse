// frontend/src/pages/konfigurasi/views/produksi/view-prod-peternakan.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
//import '../../components/livestock-batch-form';
import '../../components/generic-batch-form';
import { livestockBatchFields } from '../../components/livestock-batch-fields';
@customElement('view-prod-peternakan')
export class ViewProdPeternakan extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private formMode: 'new' | 'edit' = 'new';
  @state() private batchValue: Record<string, any> = {};

  private toggleMode(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.formMode = target.value as 'new' | 'edit';

    if (this.formMode === 'edit') {
      this.batchValue = {
        id: 'LIV-001',
        livestockId: 'AYM-BROILER-01',
        initialPopulation: 500,
        currentPopulation: 480,
        startDate: '2025-09-01',
        expectedHarvestDate: '2025-10-15',
        location: 'Kandang A1',
        description: 'Periode broiler 45 hari',
        length: 600,
        width: 400,
        height: 250,
        note: 'Kematian awal 4%.',
      };
    } else {
      this.batchValue = {};
    }
  }

  private handleSubmit(e: CustomEvent) {
    const data = e.detail;
    console.log('✅ SUBMIT BATCH TERNAK:', data);
    // TODO: Kirim ke backend / MQTT broker
  }

  private handleCancel() {
    console.log('❌ Batal input ternak');
  }

  private handleDelete(e: CustomEvent) {
    const id = e.detail;
    console.log('🗑️ Hapus batch ternak dengan ID:', id);
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

        <generic-batch-form
          .mode=${this.formMode}
          .fields=${livestockBatchFields}
          .value=${this.batchValue}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-batch-form>
      </div>
    `;
  }
}
