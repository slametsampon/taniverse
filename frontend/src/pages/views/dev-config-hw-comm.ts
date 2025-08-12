import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceConfig } from '../../domains/devices/device.model';

@customElement('dev-config-hw-comm')
export class DevConfigHwComm extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ attribute: false }) model!: DeviceConfig<any>;
  @property({ attribute: false }) errors: Record<string, string> = {};

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
    const showGPIO = d.io.bus === 'gpio';
    const showI2C = d.io.bus === 'i2c';
    const showADC = d.io.bus === 'adc';

    return html`
      <section class="p-4 space-y-6">
        <!-- I/O (Hardware) -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-700">I/O (Hardware)</h3>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Bus</span>
            <select
              class="${this.inputCls}"
              .value=${d.io.bus}
              @change=${(e: any) => this.emit('io.bus', e.target.value)}
            >
              <option value="adc">adc</option>
              <option value="i2c">i2c</option>
              <option value="gpio">gpio</option>
            </select>
            ${this.e('io.bus')
              ? html`<p class="text-xs text-red-600 mt-1">
                  ${this.e('io.bus')}
                </p>`
              : null}
          </label>

          ${showGPIO
            ? html` <label class="block">
                <span class="text-sm font-medium text-slate-700">GPIO Pin</span>
                <input
                  type="number"
                  class="${this.inputCls}"
                  .value=${String(d.io.pin ?? '')}
                  @input=${(e: any) =>
                    this.emit('io.pin', this.num(e.target.value))}
                />
                ${this.e('io.pin')
                  ? html`<p class="text-xs text-red-600 mt-1">
                      ${this.e('io.pin')}
                    </p>`
                  : null}
              </label>`
            : null}
          ${showI2C
            ? html` <label class="block">
                <span class="text-sm font-medium text-slate-700"
                  >I2C Address</span
                >
                <input
                  class="${this.inputCls}"
                  .value=${d.io.address ?? ''}
                  placeholder="0x40"
                  @input=${(e: any) => this.emit('io.address', e.target.value)}
                />
                ${this.e('io.address')
                  ? html`<p class="text-xs text-red-600 mt-1">
                      ${this.e('io.address')}
                    </p>`
                  : null}
              </label>`
            : null}
          ${showADC
            ? html` <label class="block">
                <span class="text-sm font-medium text-slate-700"
                  >ADC Channel</span
                >
                <input
                  type="number"
                  class="${this.inputCls}"
                  .value=${String(d.io.channel ?? '')}
                  @input=${(e: any) =>
                    this.emit('io.channel', this.num(e.target.value))}
                />
                ${this.e('io.channel')
                  ? html`<p class="text-xs text-red-600 mt-1">
                      ${this.e('io.channel')}
                    </p>`
                  : null}
              </label>`
            : null}
        </div>

        <!-- Komunikasi (MQTT) -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-700">
            Komunikasi (MQTT)
          </h3>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">MQTT Topic</span>
            <input
              class="${this.inputCls}"
              .value=${d.mqtt.topic ?? ''}
              @input=${(e: any) => this.emit('mqtt.topic', e.target.value)}
            />
            ${this.e('mqtt.topic')
              ? html`<p class="text-xs text-red-600 mt-1">
                  ${this.e('mqtt.topic')}
                </p>`
              : null}
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Read Cmd</span>
              <input
                class="${this.inputCls}"
                .value=${d.mqtt.readCmd ?? ''}
                placeholder="state / null"
                @input=${(e: any) => this.emit('mqtt.readCmd', e.target.value)}
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Write Cmd</span>
              <input
                class="${this.inputCls}"
                .value=${d.mqtt.writeCmd ?? ''}
                placeholder="set / null"
                @input=${(e: any) => this.emit('mqtt.writeCmd', e.target.value)}
              />
            </label>
          </div>
        </div>
      </section>
    `;
  }
}
