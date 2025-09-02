// frontend/src/views/dev-config-loc-meta.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceConfig } from '@models/device.model';

@customElement('dev-config-loc-meta')
export class DevConfigLocMeta extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ attribute: false }) model!: DeviceConfig<any>;

  private inputCls =
    'mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500';

  private emit(path: string, value: unknown) {
    this.dispatchEvent(
      new CustomEvent('dev-field-change', {
        detail: { path, value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const d = this.model;
    return html`
      <section class="p-4 space-y-6">
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-700">Lokasi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Area</span>
              <input
                class="${this.inputCls}"
                .value=${d.location.area ?? ''}
                @input=${(e: any) => this.emit('location.area', e.target.value)}
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Position</span>
              <input
                class="${this.inputCls}"
                .value=${d.location.position ?? ''}
                @input=${(e: any) =>
                  this.emit('location.position', e.target.value)}
              />
            </label>
          </div>
        </div>

        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-slate-700">Metadata</h3>
          <div class="text-xs text-slate-600">
            <div>Created At: <code>${d.meta.createdAt}</code></div>
            <div>Updated At: <code>${d.meta.updatedAt}</code></div>
          </div>
        </div>
      </section>
    `;
  }
}
