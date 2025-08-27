import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore } from '../../services/devices-service';
import type { DeviceConfig } from '../../../../models/device.model';

@customElement('dashboard-hidroponik')
export class DashboardHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  private off?: () => void;

  @state() private suhuAir: number | null = null;
  @state() private levelAir: number | null = null;
  @state() private phAir: number | null = null;
  @state() private konsentrasiNutrisi: number | null = null;
  @state() private pompaState: 'ON' | 'OFF' = 'OFF';

  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init();
    this.pull();
    this.off = devicesStore.onChange(() => {
      this.pull();
    });
  }

  private pull() {
    const suhu = devicesStore.get('TI-001') as DeviceConfig | undefined;
    const level = devicesStore.get('LI-004') as DeviceConfig | undefined;
    const ph = devicesStore.get('AI-005') as DeviceConfig | undefined;
    const nutrisi = devicesStore.get('AI-006') as DeviceConfig | undefined;
    const pompa = devicesStore.get('P-001') as DeviceConfig | undefined;

    this.suhuAir = suhu?.type === 'sensor' ? suhu.value ?? null : null;
    this.levelAir = level?.type === 'sensor' ? level.value ?? null : null;
    this.phAir = ph?.type === 'sensor' ? ph.value ?? null : null;
    this.konsentrasiNutrisi =
      nutrisi?.type === 'sensor' ? nutrisi.value ?? null : null;
    this.pompaState = pompa?.type === 'actuator' ? pompa.state ?? 'OFF' : 'OFF';
  }

  disconnectedCallback() {
    this.off?.();
    super.disconnectedCallback();
  }

  private openDetail = (tag: string) => {
    const dlg = document.querySelector('device-dialog') as any;
    if (!dlg || typeof dlg.open !== 'function') {
      console.error('[dashboard] device-dialog not found or invalid.');
      return;
    }

    const dev = devicesStore.get(tag);
    if (!dev) {
      console.warn(`[dashboard] Device ${tag} not found`);
    }

    dlg.open(tag);
  };

  private togglePompa = () => {
    const next = this.pompaState === 'ON' ? 'OFF' : 'ON';
    devicesStore.setActuatorState('P-001', next);
  };

  render() {
    const aktif = this.pompaState === 'ON';
    const warna = aktif
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

    const suhuTxt =
      this.suhuAir == null ? '--' : `${this.suhuAir.toFixed(1)} °C`;
    const levelTxt =
      this.levelAir == null ? '--' : `${this.levelAir.toFixed(1)} %`;
    const phTxt = this.phAir == null ? '--' : `${this.phAir.toFixed(1)} pH`;
    const konsentrasiTxt =
      this.konsentrasiNutrisi == null
        ? '--'
        : `${this.konsentrasiNutrisi.toFixed(0)} ppm`;

    const card = (label: string, value: string, click: () => void) => html`
      <div
        class="p-3 border rounded bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
        role="button"
        tabindex="0"
        @click=${click}
        @keydown=${(e: KeyboardEvent) =>
          (e.key === 'Enter' || e.key === ' ') && click()}
      >
        <div class="text-sm text-gray-500">${label}</div>
        <div class="text-lg font-bold">${value}</div>
      </div>
    `;

    return html`
      <section class="bg-white rounded shadow p-4">
        <div class="flex justify-between items-center mb-4">
          <h2
            class="text-xl font-semibold text-green-800 flex items-center gap-2"
          >
            🌱 Hidroponik
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          ${card('💧 Suhu Air', suhuTxt, () => this.openDetail('TI-001'))}
          ${card('🌊 Ketinggian Air', levelTxt, () =>
            this.openDetail('LI-004')
          )}
          ${card('🧪 Nutrisi', konsentrasiTxt, () => this.openDetail('AI-006'))}
          ${card('🌿 pH Air', phTxt, () => this.openDetail('AI-005'))}
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Pompa Nutrisi (P-001):</div>
          <div class="flex items-center gap-2">
            <span class="text-sm px-2 py-1 rounded ${warna}">
              ${aktif ? 'Aktif' : 'Mati'}
            </span>
            <button
              class="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              @click=${this.togglePompa}
            >
              ${aktif ? 'Matikan' : 'Nyalakan'}
            </button>
          </div>
        </div>
      </section>
    `;
  }
}
