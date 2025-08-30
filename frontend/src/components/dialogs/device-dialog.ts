// frontend/src/components/dialogs/device-dialog.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore, Device } from '../../services/devices-service';

@customElement('device-dialog')
export class DeviceDialog extends LitElement {
  createRenderRoot() {
    return this;
  }

  private dlg!: HTMLDialogElement | null;
  @state() private dev?: Device;

  firstUpdated() {
    this.dlg = this.querySelector('dialog');
  }

  async open(tagNumber: string) {
    await devicesStore.init();
    this.dev = devicesStore.get(tagNumber);
    if (!this.dlg) this.dlg = this.querySelector('dialog');
    this.dlg?.showModal();
  }

  private close = () => {
    this.dlg?.close();
  };

  /** Cek apakah status bernilai 'ok' (string atau array) */
  private isOk(status: unknown): boolean {
    if (typeof status === 'string') {
      return status === 'ok';
    }
    if (Array.isArray(status)) {
      return status.every((s) => s === 'ok');
    }
    return false;
  }

  /** Tampilkan properti dinamis dari device */
  private renderDynamic(d: Device) {
    return html`
      ${Object.entries(d).map(([key, val]) => {
        const isStatusKey = key.toLowerCase().includes('status');
        const isNormal = isStatusKey ? this.isOk(val) : true;
        const valueStr =
          typeof val === 'object'
            ? JSON.stringify(val)
            : Array.isArray(val)
            ? val.join(', ')
            : String(val);

        return html`
          <div class="flex justify-between text-sm py-1 gap-4">
            <div class="text-gray-500 font-medium">${key}</div>
            <div
              class="${isStatusKey
                ? isNormal
                  ? 'text-green-600 font-semibold'
                  : 'text-red-600 font-semibold'
                : 'text-gray-800'} text-right break-all"
            >
              ${valueStr}
            </div>
          </div>
        `;
      })}
    `;
  }

  render() {
    const d = this.dev;
    const typeEmoji =
      d?.type === 'sensor' ? '📟' : d?.type === 'actuator' ? '⚙️' : '🔧';

    return html`
      <dialog
        class="w-full max-w-md border-0 rounded-2xl p-0 
               [&::backdrop]:bg-black/40 [&::backdrop]:backdrop-blur-sm"
      >
        <section
          class="relative bg-white rounded-2xl shadow-2xl ring-1 ring-black/5
                 p-5 sm:p-6"
        >
          <button
            class="absolute top-2.5 right-2.5 inline-flex items-center justify-center
         h-8 w-8 rounded-full bg-red-500 text-white font-bold
         hover:bg-red-600 active:scale-95 transition cursor-pointer"
            @click=${this.close}
            aria-label="Tutup dialog"
            title="Tutup"
          >
            ✕
          </button>

          <header class="mb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">${typeEmoji}</span>
              <h3 class="text-lg font-semibold text-gray-800">
                ${d ? `${d.description} (${d.tagNumber})` : 'Device'}
              </h3>
            </div>
            <p class="mt-0.5 text-xs text-gray-400">
              ${d?.type === 'sensor'
                ? 'Sensor'
                : d?.type === 'actuator'
                ? 'Aktuator'
                : 'Perangkat'}
            </p>
          </header>

          ${d
            ? html`<div class="space-y-2">${this.renderDynamic(d)}</div>`
            : html`<div class="text-sm text-gray-500">
                Device tidak ditemukan.
              </div>`}
        </section>
      </dialog>
    `;
  }
}
