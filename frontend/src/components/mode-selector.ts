import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { mqttContext, type MqttContextValue } from '../context/mqtt-context';

@customElement('mode-selector')
export class ModeSelector extends LitElement {
  createRenderRoot() {
    return this; // gunakan light DOM
  }

  @consume({ context: mqttContext, subscribe: true })
  private mqttCtx?: MqttContextValue;

  private onChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    if (value !== this.mqttCtx?.mode) {
      console.info('[mode-selector] Mode changed to:', value);
      this.mqttCtx?.setMode?.(value as any);
    }
  }

  render() {
    return html`
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          gap: 0.5rem;
        "
      >
        <label for="mode" style="color: #374151; font-weight: 500;"
          >Mode:</label
        >
        <select
          id="mode"
          .value=${this.mqttCtx?.mode ?? 'mock'}
          @change=${this.onChange}
          style="
            padding: 0.375rem 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #d1d5db;
            background-color: #fff;
            font-size: 0.875rem;
            outline: none;
          "
        >
          <option value="mock">🧪 Mock</option>
          <option value="mqtt">📡 MQTT</option>
          <option value="sim">🌀 Simulasi</option>
        </select>
      </div>
    `;
  }
}
