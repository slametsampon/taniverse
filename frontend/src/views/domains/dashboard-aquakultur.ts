import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore, type Device } from '../../services/devices-service';

@customElement('dashboard-aquakultur')
export class DashboardAquakultur extends LitElement {
  createRenderRoot() {
    return this;
  }

  private off?: () => void;

  @state() private suhuAir: number | null = null;
  @state() private phAir: number | null = null;
  @state() private oksigen: number | null = null;
  @state() private aeratorState: 'ON' | 'OFF' = 'OFF';

  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init(true);
    this.pull();
    this.off = devicesStore.onChange(() => {
      this.pull();
    });
  }

  disconnectedCallback() {
    this.off?.();
    super.disconnectedCallback();
  }

  private pull() {
    const suhu = devicesStore.get('TI-101') as Device | undefined;
    const ph = devicesStore.get('AI-105') as Device | undefined;
    const oksigen = devicesStore.get('AI-106') as Device | undefined;
    const aerator = devicesStore.get('P-101') as Device | undefined;

    this.suhuAir = suhu?.type === 'sensor' ? suhu.value : null;
    this.phAir = ph?.type === 'sensor' ? ph.value : null;
    this.oksigen = oksigen?.type === 'sensor' ? oksigen.value : null;
    this.aeratorState = aerator?.type === 'actuator' ? aerator.state : 'OFF';
  }

  private openDetail(tag: string) {
    const dlg = document.querySelector('device-dialog') as any;
    if (!dlg || typeof dlg.open !== 'function') return;
    dlg.open(tag);
  }

  private toggleAerator() {
    const next = this.aeratorState === 'ON' ? 'OFF' : 'ON';
    devicesStore.setActuatorState('P-101', next);
  }

  render() {
    const aktif = this.aeratorState === 'ON';
    const warna = aktif
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
    const suhuTxt =
      this.suhuAir == null ? '--' : `${this.suhuAir.toFixed(1)} °C`;
    const phTxt = this.phAir == null ? '--' : `${this.phAir.toFixed(1)} pH`;
    const oksigenTxt =
      this.oksigen == null ? '--' : `${this.oksigen.toFixed(1)} mg/L`;

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
            class="text-xl font-semibold text-blue-800 flex items-center gap-2"
          >
            🐟 Akuakultur
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          ${card('💧 Suhu Air', suhuTxt, () => this.openDetail('TI-101'))}
          ${card('🌿 pH Air', phTxt, () => this.openDetail('AI-105'))}
          ${card('🧪 Oksigen Terlarut', oksigenTxt, () =>
            this.openDetail('AI-106')
          )}
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Aerator (P-101):</div>
          <div class="flex items-center gap-2">
            <span class="text-sm px-2 py-1 rounded ${warna}"
              >${aktif ? 'Aktif' : 'Mati'}</span
            >
            <button
              class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              @click=${this.toggleAerator}
            >
              ${aktif ? 'Matikan' : 'Nyalakan'}
            </button>
          </div>
        </div>
      </section>
    `;
  }
}
