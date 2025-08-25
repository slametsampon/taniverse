import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { mqttContext, type MqttContextValue } from '../context/mqtt-context';

@customElement('mode-selector')
export class ModeSelector extends LitElement {
  createRenderRoot() {
    return this; // gunakan light DOM
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

  private async onSaveDb() {
    if (this.saving) return;
    this.saving = true;
    console.info('[mode-selector] request DB backup…');

    // 1) Coba panggil endpoint backend
    try {
      const res = await fetch('/api/db/backup', { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      console.info('[mode-selector] DB backup success');
      alert('✅ Database berhasil disimpan/backup.');
    } catch (err) {
      console.warn('[mode-selector] DB backup endpoint error:', err);
      // 2) Fallback: emit event agar parent bisa handle
      this.dispatchEvent(
        new CustomEvent('save-db', { bubbles: true, composed: true })
      );
      alert('ℹ️ Perintah simpan DB dikirim ke parent (fallback event).');
    } finally {
      this.saving = false;
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

        <!-- Tombol Simpan Database -->
        <button
          @click=${this.onSaveDb}
          ?disabled=${this.saving}
          title="Simpan/backup database"
          style="
            display: inline-flex;
            align-items: center;
            gap: .5rem;
            padding: 0.375rem 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #10b981;
            background: ${this.saving ? '#a7f3d0' : '#10b981'};
            color: white;
            cursor: ${this.saving ? 'not-allowed' : 'pointer'};
            transition: filter .15s ease;
          "
        >
          <span>💾</span>
          <span>${this.saving ? 'Menyimpan…' : 'Simpan DB'}</span>
        </button>
      </div>
    `;
  }
}
