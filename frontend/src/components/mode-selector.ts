// frontend/src/components/mode-selector.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { mqttContext, type MqttContextValue } from 'src/context/mqtt-context';

@customElement('mode-selector')
export class ModeSelector extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM
  }

  @consume({ context: mqttContext, subscribe: true })
  private mqttCtx?: MqttContextValue;

  @state() private saving = false;

  private onChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    if (value !== this.mqttCtx?.mode) {
      console.info('[mode-selector] Mode changed to:', value);
      this.mqttCtx?.setMode?.(value as any);
    }
  }

  private async onSaveClick() {
    this.dispatchEvent(
      new CustomEvent('save-db', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div
        class="flex flex-wrap items-center gap-4 p-3 rounded-lg border bg-slate-50 text-sm"
      >
        <div class="flex items-center gap-2">
          <label for="mode" class="text-gray-700 font-medium">Mode:</label>
          <select
            id="mode"
            class="px-3 py-1.5 rounded border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            .value=${this.mqttCtx?.mode ?? 'mock'}
            @change=${this.onChange}
          >
            <option value="mock">🧪 Mock</option>
            <option value="mqtt">📡 MQTT</option>
            <option value="sim">🌀 Simulasi</option>
          </select>
        </div>

        <div class="flex-1"></div>

        <button
          class="flex items-center gap-2 px-4 py-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          title="Simpan database (backup)"
          @click=${this.onSaveClick}
        >
          💾 Simpan DB
        </button>
      </div>
    `;
  }
}
