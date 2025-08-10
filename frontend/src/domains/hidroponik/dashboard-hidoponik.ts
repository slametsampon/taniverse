import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore, Device } from '../../components/devices-service';

@customElement('dashboard-hidroponik')
export class DashboardHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  private off?: () => void;
  @state() private suhuAir: number | null = null;
  @state() private pompaState: 'ON' | 'OFF' = 'OFF';

  async connectedCallback() {
    super.connectedCallback();
    await devicesStore.init();
    this.pull();
    this.off = devicesStore.onChange(() => this.pull());
  }
  disconnectedCallback() {
    this.off?.();
    super.disconnectedCallback();
  }

  private pull() {
    const suhu = devicesStore.get('TI-001') as Device | undefined;
    const pmp = devicesStore.get('PMP001') as Device | undefined;
    this.suhuAir = suhu?.type === 'sensor' ? suhu.value : null;
    this.pompaState = pmp?.type === 'actuator' ? pmp.state : 'OFF';
  }

  private togglePompa = () => {
    const next = this.pompaState === 'ON' ? 'OFF' : 'ON';
    devicesStore.setActuatorState('PMP001', next);
  };

  render() {
    const aktif = this.pompaState === 'ON';
    const warna = aktif
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
    const suhuTxt =
      this.suhuAir == null ? '--' : `${this.suhuAir.toFixed(1)} °C`;

    return html`
      <section class="bg-white rounded shadow p-4">
        <h2 class="text-xl font-semibold text-green-800 mb-4">
          🌱 Hidroponik
          <span class="ml-2 text-xs text-gray-500"
            >mode: ${devicesStore.getMode()}</span
          >
        </h2>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="p-3 border rounded bg-gray-50">
            <div class="text-sm text-gray-500">Suhu Air</div>
            <div class="text-lg font-bold text-orange-600">${suhuTxt}</div>
          </div>
          <div class="p-3 border rounded bg-gray-50">
            <div class="text-sm text-gray-500">Ketinggian Air</div>
            <div class="text-lg font-bold text-cyan-700">--</div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Pompa Nutrisi (PMP001):</div>
          <div class="flex items-center gap-2">
            <span class="text-sm px-2 py-1 rounded ${warna}"
              >${aktif ? 'Aktif' : 'Mati'}</span
            >
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
