// frontend/src/components/sensor-trend-multi.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Chart from 'chart.js/auto';
import { getBufferManager } from 'src/lib/buffer-singleton';
import { fetchAllDevices } from 'src/services/device.service';
import type { Device } from '@models/device.model';

@customElement('sensor-trend-multi')
export class SensorTrendMulti extends LitElement {
  @state() devices: Device[] = [];
  @state() selectedTags: string[] = [];

  private chart: Chart | null = null;
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

    this.intervalId = window.setInterval(() => this.updateChart(), 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intervalId) clearInterval(this.intervalId);
  }

  firstUpdated() {
    const ctx = this.renderRoot.querySelector('canvas')!;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        animation: false,
        scales: { y: { beginAtZero: false } },
      },
    });
  }

  updateChart() {
    if (!this.chart || !this.buffer) return;

    const datasets = this.selectedTags.map((tag, idx) => {
      const color = this.colors[idx % this.colors.length];
      const values = this.buffer.getValues(tag);
      return {
        label: tag,
        data: values,
        borderColor: color,
        backgroundColor: color + '33',
        borderWidth: 2,
        tension: 0.3,
        fill: false,
        yAxisID: 'y',
      };
    });

    const firstTag = this.selectedTags[0];
    const labels = this.buffer.getLabels(firstTag);

    const minY = Math.min(
      ...this.selectedTags.map(
        (t) =>
          this.devices.find((d) => d.tagNumber === t)?.alarms_low ?? Infinity
      )
    );
    const maxY = Math.max(
      ...this.selectedTags.map(
        (t) =>
          this.devices.find((d) => d.tagNumber === t)?.alarms_high ?? -Infinity
      )
    );

    this.chart.data.labels = labels;
    this.chart.data.datasets = datasets;
    this.chart.options!.scales!['y'] = {
      min: isFinite(minY) ? minY - 2 : undefined,
      max: isFinite(maxY) ? maxY + 2 : undefined,
      beginAtZero: false,
    };

    this.chart.update('none');
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

  render() {
    return html`
      <div class="p-4 bg-white shadow rounded-xl">
        <h2 class="text-lg font-bold mb-2 text-gray-800">
          📈 Trending Multi Sensor
        </h2>
        ${this.renderTagSelector()}
        <canvas></canvas>
      </div>
    `;
  }
}
