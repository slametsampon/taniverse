// frontend/src/pages/konfigurasi/devices/dev-config-mqtt.ts

import { LitElement, html } from 'lit';
import { consume } from '@lit/context';
import { customElement, state } from 'lit/decorators.js';
import mqtt from 'mqtt';
import { mqttContext } from 'src/context/mqtt-context';
import type { MqttContextValue } from 'src/context/mqtt-context';
import { loadDevices, getByTag } from 'src/services/devices-config.service';
import 'src/components/mqtt-control-panel';
import type { DeviceModel } from '@models/device.model';

@customElement('dev-config-mqtt')
export class DevConfigMqtt extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private allTags: string[] = [];
  @state() private selectedTags: Set<string> = new Set();
  @state() private deviceList: DeviceModel[] = [];
  @state() private client: mqtt.MqttClient | null = null;
  @state() private simulating = false;
  @state() private logs: string[] = [];

  @consume({ context: mqttContext, subscribe: true })
  @state()
  private ctx?: MqttContextValue;

  private intervalHandle: any;

  async connectedCallback() {
    super.connectedCallback();
    const list = await loadDevices();
    this.deviceList = list;
    this.allTags = list
      .map((d) => d.tagNumber)
      .filter(Boolean)
      .sort();
  }

  private getDevice(tag: string): DeviceModel | undefined {
    return this.deviceList.find((d) => d.tagNumber === tag);
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
    const device = this.getDevice(tag);
    const location = (device?.location ?? '')
      .toLowerCase()
      .replace(/[\/\\ ]/g, '-');
    const suffix = type === 'sensor' ? 'value' : 'state';
    return `${nodeId}/${location}/${tag}/${suffix}`;
  }

  private publishOnce() {
    this.connectMQTT();
    this.selectedTags.forEach((tag) => {
      const dev = this.getDevice(tag);
      if (!dev) return;
      const topic = this.generateTopic(tag, dev.type);
      const payload = this.buildPayload(tag);
      this.client?.publish(topic, payload);
      this.log(`📤 Published to ${topic}: ${payload}`);
    });
  }

  private subscribeTopics() {
    this.connectMQTT();
    this.selectedTags.forEach((tag) => {
      const dev = this.getDevice(tag);
      if (!dev) return;
      const topic = this.generateTopic(tag, dev.type);
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

  render() {
    return html`
      <div class="space-y-4">
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

        <mqtt-control-panel
          .simulating=${this.simulating}
          @publish=${this.publishOnce}
          @subscribe=${this.subscribeTopics}
          @start-sim=${this.startSimulation}
          @stop-sim=${this.stopSimulation}
        ></mqtt-control-panel>

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
