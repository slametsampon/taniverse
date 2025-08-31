// frontend/src/components/cards/dashboard-device-card.ts
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Device } from '../../services/devices-service';

@customElement('dashboard-device-card')
export class DashboardDeviceCard extends LitElement {
  createRenderRoot() {
    return this; // light DOM agar Tailwind aktif
  }

  @property({ type: Object }) device?: Device;
  @property({ type: String }) value: string | null = null;
  @property({ type: String }) tag?: string; // fallback jika device belum tersedia

  private handleClick = () => {
    const tag = this.device?.tagNumber ?? this.tag;
    if (tag) {
      this.dispatchEvent(
        new CustomEvent('device-click', {
          detail: { tag },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  render() {
    const tagNumber = this.device?.tagNumber ?? this.tag ?? '--';
    const description = this.device?.description ?? '';
    const displayValue = this.value ?? '--';

    return html`
      <div
        class="flex items-center justify-between gap-4 px-4 py-2 border-b hover:bg-gray-50 cursor-pointer"
        @click=${this.handleClick}
        role="button"
        tabindex="0"
        @keydown=${(e: KeyboardEvent) =>
          (e.key === 'Enter' || e.key === ' ') && this.handleClick()}
      >
        <div class="flex flex-col">
          <div class="text-sm font-semibold text-green-700">${tagNumber}</div>
          <div class="text-xs text-gray-500">${description}</div>
        </div>
        <div class="text-lg font-bold text-right text-gray-800 min-w-[60px]">
          ${displayValue}
        </div>
      </div>
    `;
  }
}
