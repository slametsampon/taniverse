// frontend/src/components/mqtt-control-panel.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mqtt-control-panel')
export class MqttControlPanel extends LitElement {
  createRenderRoot() {
    return this; // Light DOM
  }

  @property({ type: Boolean }) simulating = false;

  private emit(name: string) {
    this.dispatchEvent(
      new CustomEvent(name, { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <div class="flex flex-wrap gap-2 mt-4">
        <button
          class="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          @click=${() => this.emit('publish')}
        >
          📤 Publish Now
        </button>

        <button
          class="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          @click=${() => this.emit('subscribe')}
        >
          📡 Subscribe
        </button>

        ${this.simulating
          ? html`
              <button
                class="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700"
                @click=${() => this.emit('stop-sim')}
              >
                ⏹️ Stop Simulation
              </button>
            `
          : html`
              <button
                class="px-3 py-2 rounded bg-amber-500 text-white hover:bg-amber-600"
                @click=${() => this.emit('start-sim')}
              >
                ▶️ Start Simulation
              </button>
            `}
      </div>
    `;
  }
}
