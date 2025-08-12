import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore, Device } from './devices-service';

@customElement('device-dialog')
export class DeviceDialog extends LitElement {
  // Light DOM supaya class Tailwind aktif
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
    this.dev = devicesStore.get(tagNumber) as Device | undefined;
    if (!this.dlg) this.dlg = this.querySelector('dialog');
    this.dlg?.showModal();
  }

  private close = () => {
    this.dlg?.close();
  };

  private renderRow(label: string, value: unknown) {
    return html`
      <div class="flex justify-between items-start gap-4 text-sm py-1">
        <div class="text-gray-500">${label}</div>
        <div class="font-medium text-gray-800 text-right">${value ?? '-'}</div>
      </div>
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
          <!-- Tombol X (kanan-atas) -->
          <button
            class="absolute top-2.5 right-2.5 inline-flex items-center justify-center
                   h-8 w-8 rounded-lg text-gray-400 hover:text-red-500
                   hover:bg-red-50 active:scale-95 transition"
            @click=${this.close}
            aria-label="Tutup dialog"
            title="Tutup"
          >
            ✕
          </button>

          <!-- Header -->
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

          <!-- Body -->
          ${d
            ? html`
                <div class="space-y-2">
                  ${this.renderRow('Kind', (d as any).kind)}
                  ${this.renderRow('Unit', d.unit)}
                  ${d.type === 'sensor'
                    ? this.renderRow(
                        'Nilai',
                        (d.value ?? '-') + (d.unit ? ` ${d.unit}` : '')
                      )
                    : this.renderRow('State', (d as any).state)}
                  ${d.ranges
                    ? this.renderRow(
                        'Range',
                        `${d.ranges.low ?? '-'} .. ${d.ranges.high ?? '-'}`
                      )
                    : null}
                  ${d.alarms
                    ? this.renderRow(
                        'Alarm',
                        `${d.alarms.low ?? '-'} / ${d.alarms.high ?? '-'}`
                      )
                    : null}
                </div>
              `
            : html`
                <div class="text-sm text-gray-500">Device tidak ditemukan.</div>
              `}
        </section>
      </dialog>
    `;
  }
}
