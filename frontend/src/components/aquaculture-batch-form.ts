// frontend/src/components/aquaculture-batch-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { AquacultureBatch } from '@models/aquaculture-batch.model';
import './crud-buttons';

@customElement('aquaculture-batch-form')
export class AquacultureBatchForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';

  @state()
  private allBatches: AquacultureBatch[] = [];

  @state()
  private draft: AquacultureBatch = this.emptyBatch();

  @state()
  private selectedId = '';

  connectedCallback() {
    super.connectedCallback();
    this.loadMockData();
  }

  updated(changed: Map<string, any>) {
    if (changed.has('mode')) {
      console.log(`[MODE]: ${this.mode}`);
      if (this.mode === 'edit') {
        if (!this.allBatches.length) {
          this.loadMockData();
        } else {
          this.selectedId = this.allBatches[0]?.id ?? '';
          this.loadSelectedBatch();
        }
      } else {
        this.draft = this.emptyBatch();
      }
    }
  }

  async loadMockData() {
    const res = await fetch('/assets/mock/aqua-batches.json');
    this.allBatches = await res.json();
    console.log('[MOCK BATCHES]', this.allBatches);

    if (this.mode === 'edit') {
      this.selectedId = this.allBatches[0]?.id ?? '';
      this.loadSelectedBatch();
    }
  }

  loadSelectedBatch() {
    const found = this.allBatches.find((b) => b.id === this.selectedId);
    if (found) {
      this.draft = { ...found };
    } else {
      this.draft = this.emptyBatch();
    }
  }

  emptyBatch(): AquacultureBatch {
    return {
      id: '',
      speciesId: '',
      code: '',
      pond: '',
      startDate: '',
      expectedHarvestDate: '',
      initialPopulation: 0,
      currentPopulation: 0,
      status: 'Growing',
      note: '',
    };
  }

  handleChange(e: Event, key: keyof AquacultureBatch) {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    let value: any = target.value;

    const numericFields: (keyof AquacultureBatch)[] = [
      'initialPopulation',
      'currentPopulation',
    ];
    if (numericFields.includes(key)) {
      value = parseInt(value);
    }

    this.draft = { ...this.draft, [key]: value };
  }

  handleSelectChange(e: Event) {
    this.selectedId = (e.target as HTMLSelectElement).value;
    this.loadSelectedBatch();
  }

  validate(batch: AquacultureBatch) {
    if (!batch.id) return { valid: false, message: 'ID wajib diisi.' };
    if (!batch.speciesId)
      return { valid: false, message: 'Spesies wajib diisi.' };
    if (!batch.code)
      return { valid: false, message: 'Kode batch wajib diisi.' };
    if (!batch.pond) return { valid: false, message: 'Kolam wajib diisi.' };
    if (!batch.startDate)
      return { valid: false, message: 'Tanggal mulai wajib diisi.' };
    return { valid: true };
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

  private renderInput(
    label: string,
    key: keyof AquacultureBatch,
    value: string | number,
    type: 'text' | 'number' | 'date' = 'text'
  ) {
    return html`
      <div class="space-y-1">
        <label class="block text-sm text-gray-700 font-medium">${label}</label>
        <input
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          .value=${String(value)}
          type=${type}
          @input=${(e: Event) => this.handleChange(e, key)}
        />
      </div>
    `;
  }

  render() {
    return html`
      <div
        class="border border-gray-300 rounded-lg p-6 bg-white shadow-sm space-y-6 text-sm"
      >
        <!-- Judul Form -->
        <div>
          <h3 class="text-lg font-semibold text-green-700">
            ${this.mode === 'new'
              ? 'Tambah Batch Baru'
              : 'Edit Batch Akuakultur'}
          </h3>
          <p class="text-gray-500">
            ${this.mode === 'new'
              ? 'Isi data berikut untuk menambahkan batch akuakultur baru.'
              : 'Pilih dan edit batch akuakultur yang sudah ada.'}
          </p>
        </div>

        <!-- Pilih Batch (edit mode) -->
        ${this.mode === 'edit'
          ? html`
              <div class="space-y-1">
                <label class="block text-sm text-gray-700 font-medium"
                  >Pilih Batch</label
                >
                <select
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  .value=${this.selectedId}
                  @change=${this.handleSelectChange}
                >
                  ${this.allBatches.map(
                    (b) =>
                      html`<option value=${b.id}>${b.code} — ${b.pond}</option>`
                  )}
                </select>
              </div>
            `
          : null}

        <!-- Form Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${this.renderInput('ID', 'id', this.draft.id)}
          ${this.renderInput('Kode Batch', 'code', this.draft.code)}
          ${this.renderInput('Kolam', 'pond', this.draft.pond)}
          ${this.renderInput('Spesies ID', 'speciesId', this.draft.speciesId)}
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
            'Populasi Awal',
            'initialPopulation',
            String(this.draft.initialPopulation),
            'number'
          )}
          ${this.renderInput(
            'Populasi Saat Ini',
            'currentPopulation',
            String(this.draft.currentPopulation),
            'number'
          )}

          <!-- Status Select -->
          <div class="space-y-1">
            <label class="block text-sm text-gray-700 font-medium"
              >Status</label
            >
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              .value=${this.draft.status}
              @change=${(e: Event) => this.handleChange(e, 'status')}
            >
              <option value="Growing">Growing</option>
              <option value="Harvested">Harvested</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <!-- Catatan -->
        <div class="space-y-1">
          <label class="block text-sm text-gray-700 font-medium">Catatan</label>
          <textarea
            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none min-h-[80px]"
            .value=${this.draft.note ?? ''}
            @input=${(e: Event) => this.handleChange(e, 'note')}
          ></textarea>
        </div>

        <!-- Tombol Aksi -->
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
