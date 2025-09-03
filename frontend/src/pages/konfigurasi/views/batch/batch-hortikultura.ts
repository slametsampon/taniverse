// frontend/src/pages/konfigurasi/views/produksi/batch-hortikultura.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../components/generic-batch-form';
import { hortiBatchFields } from '../../schema/horti-batch-fields';

@customElement('batch-hortikultura')
export class ViewProdHortikultura extends LitElement {
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
        id: 'HORTI-001',
        plantId: 'CABAI001',
        initialCount: 100,
        totalPlants: 95,
        startDate: '2025-09-01',
        expectedHarvestDate: '2025-11-01',
        location: 'Lahan-1B',
        description: 'Percobaan varietas baru cabai merah',
        length: 500,
        width: 300,
        height: 0,
        note: 'Perlu monitoring intensif.',
      };
    } else {
      this.batchValue = {};
    }
  }

  private handleSubmit(e: CustomEvent) {
    const data = e.detail;
    console.log('📝 SUBMIT BATCH HORTIKULTURA:', data);
    // TODO: Simpan ke backend / MQTT
  }

  private handleCancel() {
    console.log('❌ Batal input hortikultura');
  }

  private handleDelete(e: CustomEvent) {
    const id = e.detail;
    console.log('🗑️ Hapus batch hortikultura dengan ID:', id);
  }

  render() {
    return html`
      <div class="p-4 space-y-6">
        <h2 class="text-xl font-semibold text-green-700">
          Manajemen Batch Hortikultura
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

        <generic-batch-form
          .mode=${this.formMode}
          .fields=${hortiBatchFields}
          .value=${this.batchValue}
          @submit=${this.handleSubmit}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></generic-batch-form>
      </div>
    `;
  }
}
