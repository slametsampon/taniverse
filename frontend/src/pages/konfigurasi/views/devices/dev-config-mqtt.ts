// frontend/src/views/dev-config-mqtt.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import mqtt from 'mqtt';

@customElement('dev-config-mqtt')
export class DevConfigMqtt extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object }) model: any = {};
  @state() private selectedTags: Set<string> = new Set();
  @state() private client: mqtt.MqttClient | null = null;
  @state() private simulating = false;
  @state() private logs: string[] = [];
  @property({ type: Array }) deviceList: any[] = [];

  private intervalHandle: any;

  private get allTags(): string[] {
    return Array.isArray(this.model?.tags) ? this.model.tags : [];
  }

  private connectMQTT() {
    if (this.client) return;
    this.client = mqtt.connect('ws://localhost:9001'); // gunakan MQTT over WebSocket
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
    const device = this.deviceList.find((d) => d.tagNumber === tag);
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
