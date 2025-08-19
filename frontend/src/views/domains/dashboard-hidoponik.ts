import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { devicesStore, Device } from '../../services/devices-service';

@customElement('dashboard-hidroponik')
export class DashboardHidroponik extends LitElement {
  createRenderRoot() {
    return this;
  }

  private off?: () => void;
  @state() private suhuAir: number | null = null;
  @state() private levelAir: number | null = null;
  @state() private phAir: number | null = null;
  @state() private kosentrasiNutrisi: number | null = null;
  @state() private pompaState: 'ON' | 'OFF' = 'OFF';

  async connectedCallback() {
    super.connectedCallback();
    console.debug('[dashboard] connected');
    await devicesStore.init();
    console.debug(
      '[dashboard] store initialized, mode =',
      devicesStore.getMode()
    );
    this.pull();
    this.off = devicesStore.onChange(() => {
      console.debug('[dashboard] store change event');
      this.pull();
    });
  }

  private pull() {
    const tags = ['TI-001', 'LI-004', 'AI-006', 'P-001'];
    const snapshot = tags.map((t) => [t, devicesStore.get(t)]);
    console.debug('[dashboard] pull snapshot =', snapshot);

    const suhu = devicesStore.get('TI-001') as Device | undefined;
    const pmp = devicesStore.get('P-001') as Device | undefined;
    const level = devicesStore.get('LI-004') as Device | undefined;
    const nutrisi = devicesStore.get('AI-006') as Device | undefined;
    const ph = devicesStore.get('AI-005') as Device | undefined;

    this.suhuAir = suhu?.type === 'sensor' ? suhu.value : null;
    this.levelAir = level?.type === 'sensor' ? level.value : null;
    this.kosentrasiNutrisi = nutrisi?.type === 'sensor' ? nutrisi.value : null;
    this.phAir = ph?.type === 'sensor' ? ph.value : null;
    this.pompaState = pmp?.type === 'actuator' ? pmp.state : 'OFF';
  }

  disconnectedCallback() {
    this.off?.();
    super.disconnectedCallback();
  }

  private openDetail = (tag: string) => {
    console.debug('[dashboard] openDetail clicked, tag =', tag);

    // Log status custom element
    const isRegistered = !!customElements.get('device-dialog');
    console.debug('[dashboard] device-dialog registered =', isRegistered);

    const dlg = document.querySelector('device-dialog') as any;
    console.debug('[dashboard] device-dialog instance =', dlg);

    if (!dlg) {
      console.error(
        '[dashboard] <device-dialog> instance NOT found in DOM. Did you add it to index.html?'
      );
      return;
    }
    if (typeof dlg.open !== 'function') {
      console.error(
        '[dashboard] dlg.open() is not a function. Check component export/registration.'
      );
      return;
    }

    // Optional: log device existence before open
    const dev = devicesStore.get(tag);
    console.debug('[dashboard] deviceStore.get(tag) =', dev);
    if (!dev) {
      console.warn(
        `[dashboard] Device ${tag} tidak ditemukan di store (cek devices.json)`
      );
    }

    dlg.open(tag);
  };

  private togglePompa = () => {
    const next = this.pompaState === 'ON' ? 'OFF' : 'ON';
    devicesStore.setActuatorState('P-001', next); // <- disamakan
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
      this.kosentrasiNutrisi == null
        ? '--'
        : `${this.kosentrasiNutrisi.toFixed(0)} ppm`;

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
        <h2 class="text-xl font-semibold text-green-800 mb-4">
          🌱 Hidroponik
          <span class="ml-2 text-xs text-gray-500"
            >mode: ${devicesStore.getMode()}</span
          >
        </h2>

        <div class="grid grid-cols-2 gap-4 mb-4">
          ${card('💧 Suhu Air', suhuTxt, () => this.openDetail('TI-001'))}
          ${card('🌊 Ketinggian Air', levelTxt, () =>
            this.openDetail('LI-004')
          )}
          ${card('🧪 Nutrisi', konsentrasiTxt, () => this.openDetail('AI-006'))}
          ${card('🌿 pH Air', phTxt, () => {
            this.openDetail('AI-005');
          })}
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Pompa Nutrisi (P-001):</div>
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
