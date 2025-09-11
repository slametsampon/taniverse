// frontend/src/pages/konfigurasi/devices/dev-config-mqtt.ts

import { LitElement, html } from 'lit';
import { consume } from '@lit/context';
import { customElement, state } from 'lit/decorators.js';
import mqtt from 'mqtt';

import { mqttContext } from 'src/context/mqtt-context';
import type { MqttContextValue } from 'src/context/mqtt-context';
import { createMqttContext } from 'src/context/mqtt-context';

import { loadDevices, getByTag } from 'src/services/devices-config.service';

import type { DeviceMode } from 'src/services/mode';
import { getMode, setMode } from 'src/services/mode';

@customElement('dev-config-mqtt')
export class DevConfigMqtt extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private allTags: string[] = [];
  @state() private selectedTags: Set<string> = new Set();
  @state() private deviceList: any[] = [];
  @state() private client: mqtt.MqttClient | null = null;
  @state() private simulating = false;
  @state() private logs: string[] = [];
  @state() private currentMode: DeviceMode = 'mock';

  @consume({ context: mqttContext, subscribe: true })
  @state()
  private ctx?: MqttContextValue;

  private intervalHandle: any;

  async connectedCallback() {
    super.connectedCallback();

    this.currentMode = getMode(); // ✅ Sinkronisasi awal dengan localStorage

    const list = await loadDevices();
    this.deviceList = list;
    this.allTags = list
      .map((d) => d.tagNumber)
      .filter(Boolean)
      .sort();
  }

  private connectMQTT() {
    if (this.client) return;
    this.client = mqtt.connect('ws://localhost:9001');
    this.client.on('connect', () => this.log('✅ MQTT connected'));
    this.client.on('error', (err) => this.log('❌ MQTT error: ' + err.message));
    this.client.on('message', (topic, payload) =>
      this.log(`📥 ${topic} → ${payload.toString()}`)
    );
  }

  private log(msg: string) {
    this.logs = [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...this.logs,
    ].slice(0, 100);
  }

  private toggleTag(tag: string, checked: boolean) {
    const tags = new Set(this.selectedTags);
    checked ? tags.add(tag) : tags.delete(tag);
    this.selectedTags = tags;
  }

  private buildPayload(tag: string) {
    return JSON.stringify({
      tagNumber: tag,
      value: parseFloat((Math.random() * 100).toFixed(2)),
      timestamp: Date.now(),
    });
  }

  private generateTopic(tag: string, type: 'sensor' | 'actuator'): string {
    const nodeId = 'esp-node-1';
    const device = getByTag(tag);
    const location = (device?.location?.area ?? '')
      .toLowerCase()
      .replace(/[\/\\ ]/g, '-');
    const suffix = type === 'sensor' ? 'value' : 'state';
    return `${nodeId}/${location}/${tag}/${suffix}`;
  }

  private publishOnce() {
    this.connectMQTT();
    this.selectedTags.forEach((tag) => {
      const topic = this.generateTopic(tag, 'sensor');
      const payload = this.buildPayload(tag);
      this.client?.publish(topic, payload);
      this.log(`📤 Published to ${topic}: ${payload}`);
    });
  }

  private subscribeTopics() {
    this.connectMQTT();
    this.selectedTags.forEach((tag) => {
      const topic = this.generateTopic(tag, 'actuator');
      this.client?.subscribe(topic);
      this.log(`📡 Subscribed to ${topic}`);
    });
  }

  private startSimulation() {
    this.connectMQTT();
    if (this.simulating) return;
    this.simulating = true;
    this.log(`▶️ Simulation started`);
    this.intervalHandle = setInterval(() => this.publishOnce(), 2000);
  }

  private stopSimulation() {
    if (!this.simulating) return;
    clearInterval(this.intervalHandle);
    this.simulating = false;
    this.log(`⏹️ Simulation stopped`);
  }

  private handleModeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const newMode = target.value as DeviceMode;

    setMode(newMode); // ✅ Gunakan fungsi resmi
    this.currentMode = newMode;

    this.log(`🔄 Mode changed to "${newMode}"`);

    // ✅ Refresh context
    window.dispatchEvent(
      new CustomEvent('mqtt:context-updated', {
        detail: createMqttContext(),
      })
    );
  }

  render() {
    return html`
      <div class="space-y-4">
        <div class="space-y-2 mt-3">
          <label class="text-sm font-semibold">Device Mode</label>
          <select .value=${this.currentMode} @change=${this.handleModeChange}>
            <option value="mock">MOCK</option>
            <option value="sim">SIM</option>
            <option value="mqtt">MQTT</option>
          </select>
          <span
            class="inline-block text-xs rounded px-2 py-1 bg-slate-200 text-slate-800 font-mono"
          >
            Mode Aktif: ${this.currentMode.toUpperCase()}
          </span>
        </div>

        <div>
          <label class="text-sm font-semibold">Device Tags</label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            ${this.allTags.map(
              (tag) => html`
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    .checked=${this.selectedTags.has(tag)}
                    @change=${(e: any) => this.toggleTag(tag, e.target.checked)}
                  />
                  <span class="text-sm font-mono">${tag}</span>
                </label>
              `
            )}
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            class="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            @click=${this.publishOnce}
          >
            📤 Publish Now
          </button>

          <button
            class="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            @click=${this.subscribeTopics}
          >
            📡 Subscribe
          </button>

          ${!this.simulating
            ? html`
                <button
                  class="px-3 py-2 rounded bg-amber-500 text-white hover:bg-amber-600"
                  @click=${this.startSimulation}
                >
                  ▶️ Start Simulation
                </button>
              `
            : html`
                <button
                  class="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700"
                  @click=${this.stopSimulation}
                >
                  ⏹️ Stop Simulation
                </button>
              `}
        </div>

        <div>
          <label class="text-sm font-semibold">Log</label>
          <div
            class="bg-slate-100 border rounded p-2 mt-1 text-xs font-mono max-h-40 overflow-y-auto"
          >
            ${this.logs.map((l) => html`<div>${l}</div>`)}
          </div>
        </div>
      </div>
    `;
  }
}
