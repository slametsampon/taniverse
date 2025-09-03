// frontend/src/components/planting-batch-form.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GenericBatch } from '@models/generic-batch.model';
import { plantingBatchSchema } from 'src/schema/planting.schema';
import './generic-batch-form';

@customElement('planting-batch-form')
export class PlantingBatchForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'new' | 'edit' = 'new';

  @state()
  private draft: GenericBatch = this.emptyBatch();

  @state()
  private allBatches: GenericBatch[] = [];

  @state()
  private selectedId = '';

  connectedCallback() {
    super.connectedCallback();
    this.loadMockData();
  }

  updated(changed: Map<string, any>) {
    if (changed.has('mode') && this.mode === 'new') {
      this.draft = this.emptyBatch();
    }
  }

  private emptyBatch(): GenericBatch {
    return {
      id: '',
      itemId: '',
      location: '',
      startDate: '',
      expectedHarvestDate: '',
      initialCount: 0,
      currentCount: 0,
      status: 'Active',
      note: '',
    };
  }

  private async loadMockData() {
    const res = await fetch('/assets/mock/plant-batches.json');
    this.allBatches = await res.json();
    if (this.mode === 'edit') {
      this.selectedId = this.allBatches[0]?.id ?? '';
      this.loadSelected();
    }
  }

  private loadSelected() {
    const found = this.allBatches.find((b) => b.id === this.selectedId);
    if (found) this.draft = { ...found };
  }

  private handleSelectChange(e: Event) {
    this.selectedId = (e.target as HTMLSelectElement).value;
    this.loadSelected();
  }

  private handleSubmit(batch: GenericBatch) {
    console.log('[SUBMIT]', batch);
  }

  private handleDelete(id: string) {
    console.log('[DELETE]', id);
  }

  private handleCancel() {
    console.log('[CANCEL]');
    this.draft =
      this.mode === 'edit'
        ? this.allBatches.find((b) => b.id === this.selectedId) ??
          this.emptyBatch()
        : this.emptyBatch();
  }

  render() {
    return html`
      <div class="space-y-4">
        ${this.mode === 'edit'
          ? html`
              <div>
                <label class="text-sm text-gray-600">Pilih Batch</label>
                <select
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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

        <generic-batch-form
          .schema=${plantingBatchSchema}
          .value=${this.draft}
          .mode=${this.mode}
          @submit=${(e: CustomEvent<GenericBatch>) =>
            this.handleSubmit(e.detail)}
          @cancel=${this.handleCancel}
          @delete=${(e: CustomEvent<string>) => this.handleDelete(e.detail)}
        ></generic-batch-form>
      </div>
    `;
  }
}
