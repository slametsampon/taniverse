// frontend/src/pages/dashboard.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// Import komponen dashboard
import '../views/hidroponik-devices.js';
import '../views/aquakultur-devices.js';
import '../views/peternakan-devices.js';
import '../components/mode-selector.js';
import '../components/dialogs/device-dialog.js';
import '../components/dashboard-mqtt.ts';

// Import tab UI
import '../components/ui/ui-tabs.js';

@customElement('page-dashboard')
export class PageDashboard extends LitElement {
  @state() private activeTab: 'operation' | 'mqtt' = 'operation';

  createRenderRoot() {
    return this;
  }

  private get tabs() {
    return [
      { id: 'operation', label: 'Operation', icon: '⚙️' },
      { id: 'mqtt', label: 'MQTT Devices', icon: '🧪' },
    ];
  }

  private onTabChange(e: CustomEvent<{ id: String }>) {
    this.activeTab = e.detail.id as 'operation' | 'mqtt';
  }

  private renderContent() {
    const cardStyle = 'display:block;margin-bottom:1.5rem;';
    if (this.activeTab === 'operation') {
      return html`
        <mode-selector></mode-selector>
        <section>
          <hidroponik-devices style=${cardStyle}></hidroponik-devices>
          <aquakultur-devices style=${cardStyle}></aquakultur-devices>
          <peternakan-devices style=${cardStyle}></peternakan-devices>
        </section>
      `;
    } else if (this.activeTab === 'mqtt') {
      return html`<dashboard-mqtt></dashboard-mqtt>`;
    }
  }

  render() {
    return html`
      <div class="p-4 space-y-4">
        <ui-tabs
          .tabs=${[
            { id: 'operation', label: 'Operation', icon: '⚙️' },
            { id: 'mqtt', label: 'MQTT Devices', icon: '🧪' },
          ] as const}
          .active=${this.activeTab}
          @dev-tab-change=${this.onTabChange}
        ></ui-tabs>

        ${this.renderContent()}
      </div>
    `;
  }
}
