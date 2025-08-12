import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceConfig } from '../../domains/devices/device.model';

@customElement('dev-config-general')
export class DevConfigGeneral extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ attribute: false }) model!: DeviceConfig<any>;
  @property({ attribute: false }) errors: Record<string, string> = {};
  @property() mode: 'new' | 'edit' = 'new';

  private inputCls =
    'mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500';

  private e = (f: string) => this.errors[f];
  private emit(path: string, value: unknown) {
    this.dispatchEvent(
      new CustomEvent('dev-field-change', {
        detail: { path, value },
        bubbles: true,
        composed: true,
      })
    );
  }
  private num = (v: string) => (v === '' ? null : Number(v));

  render() {
    const d = this.model;
    const statesCsv = (d.allowedStates ?? []).join(',');

    return html`
      <section class="p-4 space-y-6">
        <!-- Identitas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Tag Number</span>
            <input
              class="${this.inputCls}"
              .value=${d.tagNumber ?? ''}
              ?disabled=${this.mode === 'edit'}
              @input=${(e: any) => this.emit('tagNumber', e.target.value)}
            />
            ${this.e('tagNumber')
              ? html`<p class="text-xs text-red-600 mt-1">
                  ${this.e('tagNumber')}
                </p>`
              : null}
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Type</span>
            <select
              class="${this.inputCls}"
              .value=${d.type}
              @change=${(e: any) => this.emit('type', e.target.value)}
            >
              <option value="sensor">sensor</option>
              <option value="actuator">actuator</option>
            </select>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Description</span>
            <input
              class="${this.inputCls}"
              .value=${d.description ?? ''}
              @input=${(e: any) => this.emit('description', e.target.value)}
            />
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Unit</span>
            <input
              class="${this.inputCls}"
              .value=${d.unit ?? ''}
              placeholder="DegC, %, kPa, ..."
              @input=${(e: any) => this.emit('unit', e.target.value)}
            />
          </label>
        </div>

        ${d.type === 'sensor'
          ? html`
              <!-- Pengukuran -->
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-slate-700">Pengukuran</h3>
                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Range Low</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${String(d.ranges?.low ?? '')}
                      @input=${(e: any) =>
                        this.emit('ranges.low', this.num(e.target.value))}
                    />
                  </label>
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Range High</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${String(d.ranges?.high ?? '')}
                      @input=${(e: any) =>
                        this.emit('ranges.high', this.num(e.target.value))}
                    />
                    ${this.e('ranges.high')
                      ? html`<p class="text-xs text-red-600 mt-1">
                          ${this.e('ranges.high')}
                        </p>`
                      : null}
                  </label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Alarm Low</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${String(d.alarms?.low ?? '')}
                      @input=${(e: any) =>
                        this.emit('alarms.low', this.num(e.target.value))}
                    />
                    ${this.e('alarms.low')
                      ? html`<p class="text-xs text-red-600 mt-1">
                          ${this.e('alarms.low')}
                        </p>`
                      : null}
                  </label>
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Alarm High</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${String(d.alarms?.high ?? '')}
                      @input=${(e: any) =>
                        this.emit('alarms.high', this.num(e.target.value))}
                    />
                    ${this.e('alarms.high')
                      ? html`<p class="text-xs text-red-600 mt-1">
                          ${this.e('alarms.high')}
                        </p>`
                      : null}
                  </label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Sample Period (ms)</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${String(d.sample?.periodMs ?? 1000)}
                      @input=${(e: any) =>
                        this.emit('sample.periodMs', this.num(e.target.value))}
                    />
                  </label>
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Deadband</span
                    >
                    <input
                      type="number"
                      step="0.001"
                      class="${this.inputCls}"
                      .value=${d.sample?.deadband ?? ''}
                      @input=${(e: Event) => {
                        const t = e.currentTarget as HTMLInputElement;
                        const v = t.value === '' ? null : Number(t.value);
                        this.emit('sample.deadband', v);
                      }}
                    />
                  </label>
                </div>
                <label class="block">
                  <span class="text-sm font-medium text-slate-700"
                    >Display Precision</span
                  >
                  <input
                    type="number"
                    class="${this.inputCls}"
                    .value=${String(d.display?.precision ?? 0)}
                    @input=${(e: any) =>
                      this.emit('display.precision', this.num(e.target.value))}
                  />
                </label>
              </div>
            `
          : html`
              <!-- Kontrol -->
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-slate-700">Kontrol</h3>
                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Kind</span>
                  <input
                    class="${this.inputCls}"
                    .value=${d.kind ?? ''}
                    placeholder="fan, relay, ..."
                    @input=${(e: any) => this.emit('kind', e.target.value)}
                  />
                </label>
                <label class="block">
                  <span class="text-sm font-medium text-slate-700"
                    >Allowed States (comma)</span
                  >
                  <input
                    class="${this.inputCls}"
                    .value=${statesCsv}
                    placeholder="OFF,ON"
                    @input=${(e: any) =>
                      this.emit('allowedStatesCsv', e.target.value)}
                  />
                  ${this.e('allowedStates')
                    ? html`<p class="text-xs text-red-600 mt-1">
                        ${this.e('allowedStates')}
                      </p>`
                    : null}
                </label>
                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Default State</span
                    >
                    <input
                      class="${this.inputCls}"
                      .value=${d.defaultState ?? ''}
                      @input=${(e: any) =>
                        this.emit('defaultState', e.target.value)}
                    />
                    ${this.e('defaultState')
                      ? html`<p class="text-xs text-red-600 mt-1">
                          ${this.e('defaultState')}
                        </p>`
                      : null}
                  </label>
                  <label class="inline-flex items-center gap-2 mt-7">
                    <input
                      type="checkbox"
                      .checked=${!!d.writable}
                      @change=${(e: any) =>
                        this.emit('writable', e.target.checked)}
                    />
                    <span class="text-sm text-slate-700">Writable</span>
                    ${this.e('writable')
                      ? html`<span class="text-xs text-red-600 ml-2"
                          >${this.e('writable')}</span
                        >`
                      : null}
                  </label>
                </div>
              </div>
            `}

        <!-- Status (RO) -->
        <div class="border rounded p-3 bg-slate-50">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">Status</h3>
          ${d.type === 'sensor'
            ? html`<div class="text-sm">
                Value: <span class="font-medium">${d.value ?? '-'}</span>
              </div>`
            : html`<div class="text-sm">
                State: <span class="font-medium">${d.state ?? '-'}</span>
              </div>`}
        </div>
      </section>
    `;
  }
}
