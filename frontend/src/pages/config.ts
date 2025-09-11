// frontend/src/pages/config.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TabId } from 'src/types/tab-id';
import type { DeviceStateModel } from './konfigurasi/state/device-state';
import { DeviceEvents } from './konfigurasi/events/device-events';

import 'src/components/ui/ui-tabs';
import 'src/components/event-table';
import './konfigurasi/devices/device-config';
import './konfigurasi/devices/dev-config-mqtt';
import './konfigurasi/batch/form-batch-hidroponik';
import './konfigurasi/batch/form-batch-hortikultura';
import './konfigurasi/batch/form-batch-akuakultur';
import './konfigurasi/batch/form-batch-peternakan';
import './konfigurasi/entitas/entitas-container';
import './konfigurasi/batch/batch-container';

@customElement('page-config')
export class PageDeviceConfig extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @state() private device!: DeviceStateModel;
  @state() private activeTab: TabId = 'devices';
  @state() private mode: 'new' | 'edit' = 'edit';
  @state() private tags: string[] = [];

  private readonly TAB_KEY = 'deviceConfig.activeTab';

  async connectedCallback() {
    super.connectedCallback();

    const list = await DeviceEvents.loadAllDevices();
    this.tags = list
      .map((d) => d.tagNumber)
      .filter(Boolean)
      .sort();

    const tabParam = new URL(location.href).searchParams.get('tab') as TabId;
    this.activeTab =
      tabParam || (sessionStorage.getItem(this.TAB_KEY) as TabId) || 'devices';
  }

  private onTabChange(e: CustomEvent<{ id: TabId }>) {
    this.activeTab = e.detail.id;
    sessionStorage.setItem(this.TAB_KEY, this.activeTab);
  }

  render() {
    return html`
      <section class="max-w-6xl mx-auto px-4 py-6">
        <ui-tabs
          .tabs=${[
            { id: 'batch', label: 'Batch', icon: '🏭' },
            { id: 'entitas', label: 'Entitas', icon: '🧬' },
            { id: 'devices', label: 'Devices', icon: '🧾' },
            { id: 'mqtt', label: 'MQTT', icon: '📡' },
          ]}
          .active=${this.activeTab}
          @dev-tab-change=${this.onTabChange}
        ></ui-tabs>

        ${this.activeTab === 'devices'
          ? html` <device-config></device-config> `
          : this.activeTab === 'batch'
          ? html`
              <div class="mt-4">
                <batch-container></batch-container>
              </div>
            `
          : this.activeTab === 'entitas'
          ? html`
              <div class="font-semibold text-lg mt-4 mb-2 text-gray-700">
                Konfigurasi - Entitas
              </div>
              <div class="mt-4">
                <entitas-container></entitas-container>
              </div>
            `
          : this.activeTab === 'mqtt'
          ? html`<dev-config-mqtt></dev-config-mqtt>`
          : null}
      </section>
    `;
  }
}
