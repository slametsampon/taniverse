// frontend/src/components/batch-form.ts
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { PlantingBatch } from '@models/batch.model';
import './crud-buttons';

@customElement('batch-form')
export class BatchForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';

  @state()
  private allBatches: PlantingBatch[] = [];

  @state()
  private draft: PlantingBatch = this.emptyBatch();

  @state()
  private selectedId = '';

  connectedCallback() {
    super.connectedCallback();
    this.loadMockData();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('mode')) {
      console.log(`[MODE CHANGED]: ${this.mode}`);

      if (this.mode === 'edit') {
        if (!this.allBatches.length) {
          console.log('[INFO] No batch data yet, fetching...');
          this.loadMockData();
        } else {
          console.log('[INFO] Batch data already loaded, using first entry');
          this.selectedId = this.allBatches[0]?.id ?? '';
          this.loadSelectedBatch();
        }
      }

      if (this.mode === 'new') {
        console.log('[INFO] Switching to NEW mode, clearing form...');
        this.draft = this.emptyBatch();
      }
    }
  }

  async loadMockData() {
    const res = await fetch('/assets/mock/batches.json');
    this.allBatches = await res.json();

    console.log('[MOCK DATA LOADED]', this.allBatches);

    if (this.mode === 'edit') {
      this.selectedId = this.allBatches[0]?.id ?? '';
      console.log('[EDIT MODE] Default selectedId:', this.selectedId);
      this.loadSelectedBatch();
    }
  }

  loadSelectedBatch() {
    console.log('[LOAD SELECTED BATCH] ID:', this.selectedId);

    const found = this.allBatches.find((b) => b.id === this.selectedId);
    if (found) {
      console.log('[LOADING BATCH]', found);
      this.draft = { ...found };
    } else {
      console.warn('[BATCH NOT FOUND]', this.selectedId);
      this.draft = this.emptyBatch();
    }
  }

  emptyBatch(): PlantingBatch {
    return {
      id: '',
      plantId: '',
      startDate: '',
      expectedHarvestDate: '',
      holesUsed: 0,
      totalPlants: 0,
      location: '',
      status: 'Planted',
      note: '',
    };
  }

  handleChange(e: Event, key: keyof PlantingBatch) {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    let value: any = target.value;
    if (key === 'holesUsed' || key === 'totalPlants') value = parseInt(value);
    this.draft = { ...this.draft, [key]: value };
  }

  handleSelectChange(e: Event) {
    this.selectedId = (e.target as HTMLSelectElement).value;
    this.loadSelectedBatch();
  }

  submit = () => {
    const valid = this.validate(this.draft);
    if (!valid.valid) return alert(valid.message);
    console.log('[SUBMIT]', this.draft);
  };

  cancel = () => {
    console.log('[CANCEL]');
    this.draft = this.mode === 'edit' ? { ...this.draft } : this.emptyBatch();
  };

  delete = () => {
    if (confirm('Yakin ingin menghapus?')) {
      console.log('[DELETE]', this.draft.id);
    }
  };

  validate(batch: PlantingBatch) {
    if (!batch.id) return { valid: false, message: 'ID wajib diisi.' };
    if (!batch.plantId)
      return { valid: false, message: 'Plant ID wajib diisi.' };
    if (!batch.location)
      return { valid: false, message: 'Lokasi wajib diisi.' };
    if (!batch.startDate)
      return { valid: false, message: 'Tanggal mulai wajib diisi.' };
    return { valid: true };
  }

  // ✅ Type untuk input field
  private renderInput(
    label: string,
    key: keyof PlantingBatch,
    value: string,
    type: 'text' | 'number' | 'date' = 'text'
  ) {
    return html`
      <div>
        <label class="block text-gray-600">${label}</label>
        <input
          class="w-full border px-2 py-1 rounded"
          .value=${value}
          type=${type}
          @input=${(e: Event) => this.handleChange(e, key)}
        />
      </div>
    `;
  }

  render() {
    return html`
      <div class="border rounded p-4 bg-white space-y-4 text-sm">
        ${this.mode === 'edit'
          ? html`
              <div>
                <label class="block text-gray-600">Pilih Batch</label>
                <select
                  class="w-full border px-2 py-1 rounded"
                  .value=${this.selectedId}
                  @change=${this.handleSelectChange}
                >
                  ${this.allBatches.map(
                    (b) =>
                      html`<option value=${b.id}>
                        ${b.id} - ${b.location}
                      </option>`
                  )}
                </select>
              </div>
            `
          : null}

        <div class="grid grid-cols-2 gap-4">
          ${this.renderInput('ID', 'id', this.draft.id)}
          ${this.renderInput('Plant ID', 'plantId', this.draft.plantId)}
          ${this.renderInput('Lokasi', 'location', this.draft.location)}
          ${this.renderInput(
            'Tanggal Mulai',
            'startDate',
            this.draft.startDate,
            'date'
          )}
          ${this.renderInput(
            'Estimasi Panen',
            'expectedHarvestDate',
            this.draft.expectedHarvestDate,
            'date'
          )}
          ${this.renderInput(
            'Lubang Terpakai',
            'holesUsed',
            this.draft.holesUsed.toString(),
            'number'
          )}
          ${this.renderInput(
            'Jumlah Tanaman',
            'totalPlants',
            this.draft.totalPlants.toString(),
            'number'
          )}

          <div>
            <label class="block text-gray-600">Status</label>
            <select
              class="w-full border px-2 py-1 rounded"
              .value=${this.draft.status}
              @change=${(e: Event) => this.handleChange(e, 'status')}
            >
              <option value="Planted">Planted</option>
              <option value="Harvested">Harvested</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-gray-600">Catatan</label>
          <textarea
            class="w-full border px-2 py-1 rounded"
            .value=${this.draft.note ?? ''}
            @input=${(e: Event) => this.handleChange(e, 'note')}
          ></textarea>
        </div>

        <crud-buttons
          .mode=${this.mode}
          @submit=${this.submit}
          @cancel=${this.cancel}
          @delete=${this.delete}
        ></crud-buttons>
      </div>
    `;
  }
}
