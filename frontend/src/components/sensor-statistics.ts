// frontend/src/components/sensor-statistics.ts

import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getBufferManager } from 'src/lib/buffer-singleton';
import { fetchAllDevices } from '../services/device.service';
import type { Device } from '@models/device.model';

@customElement('sensor-statistics')
export class SensorStatistics extends LitElement {
  static styles = css`
    .stick-container {
      height: 140px;
      position: relative;
    }
    .stick-line {
      position: absolute;
      width: 2px;
      background-color: currentColor;
      left: 50%;
      transform: translateX(-50%);
    }
    .tick {
      position: absolute;
      height: 2px;
      width: 20px;
      background-color: currentColor;
      left: 50%;
      transform: translateX(-50%);
    }
    .avg-line {
      position: absolute;
      height: 0;
      width: 20px;
      border-top: 2px dashed currentColor;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  @state() devices: Device[] = [];
  @state() selectedTags: string[] = [];
  @state() stats: Record<string, { min: number; max: number; avg: number }> =
    {};

  private buffer!: Awaited<ReturnType<typeof getBufferManager>>;
  private intervalId?: number;
  private colors = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
  ];

  async connectedCallback() {
    super.connectedCallback();
    this.devices = await fetchAllDevices();
    this.selectedTags = this.devices
      .filter((d) => d.type === 'sensor')
      .map((d) => d.tagNumber);
    this.buffer = await getBufferManager();

    this.computeStats();
    this.intervalId = window.setInterval(() => this.computeStats(), 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intervalId) clearInterval(this.intervalId);
  }

  computeStats() {
    const result: typeof this.stats = {};
    this.selectedTags.forEach((tag) => {
      const values = this.buffer.getValues(tag);
      if (values.length === 0) return;

      const min = Math.min(...values);
      const max = Math.max(...values);
      const avg = values.reduce((sum, v) => sum + v, 0) / values.length;

      result[tag] = {
        min: parseFloat(min.toFixed(2)),
        max: parseFloat(max.toFixed(2)),
        avg: parseFloat(avg.toFixed(2)),
      };
    });
    this.stats = result;
  }

  toggleTag(tag: string, checked: boolean) {
    this.selectedTags = checked
      ? [...this.selectedTags, tag]
      : this.selectedTags.filter((t) => t !== tag);
  }

  renderTagSelector() {
    return html`
      <div class="flex flex-wrap gap-3 mb-4">
        ${this.devices.map(
          (dev) => html`
            <label class="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                .checked=${this.selectedTags.includes(dev.tagNumber)}
                @change=${(e: Event) =>
                  this.toggleTag(
                    dev.tagNumber,
                    (e.target as HTMLInputElement).checked
                  )}
              />
              ${dev.tagNumber}
            </label>
          `
        )}
      </div>
    `;
  }

  renderVerticalStick(
    tag: string,
    stat: { min: number; max: number; avg: number },
    color: string
  ) {
    const { min, max, avg } = stat;
    const range = max - min || 1;

    const avgPct = ((avg - min) / range) * 100;

    return html`
      <div
        class="flex flex-col items-center text-center w-24"
        style="color: ${color}"
      >
        <div class="text-xs mb-1 font-semibold">Max</div>

        <div class="stick-container">
          <!-- Vertical stick -->
          <div class="stick-line" style="height: 100%;"></div>

          <!-- Max tick -->
          <div class="tick" style="top: 0;"></div>

          <!-- Avg tick (dashed) -->
          <div class="avg-line" style="top: ${100 - avgPct}%"></div>

          <!-- Min tick -->
          <div class="tick" style="bottom: 0;"></div>
        </div>

        <div class="text-xs mt-1 font-semibold">Min</div>
        <div class="text-sm mt-1 font-medium">${tag}</div>
        <div class="text-[10px] text-gray-500">
          Min: ${min} <br />
          Avg: ${avg} <br />
          Max: ${max}
        </div>
      </div>
    `;
  }

  renderStickChart() {
    return html`
      <div class="flex flex-wrap gap-6 justify-start">
        ${this.selectedTags.map((tag, idx) => {
          const stat = this.stats[tag];
          const color = this.colors[idx % this.colors.length];
          return stat ? this.renderVerticalStick(tag, stat, color) : null;
        })}
      </div>
    `;
  }

  render() {
    return html`
      <div class="p-4 bg-white shadow rounded-xl">
        <h2 class="text-lg font-bold mb-2 text-gray-800">
          📊 Statistik Sensor (Stick Vertical)
        </h2>
        ${this.renderTagSelector()} ${this.renderStickChart()}
      </div>
    `;
  }
}
