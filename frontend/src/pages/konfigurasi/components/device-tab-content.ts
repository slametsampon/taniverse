// frontend/src/pages/konfigurasi/device-tab-content.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceStateModel } from './state/device-state';
import { getByTag } from 'src/services/devices-config.service';
import type { TabId } from 'src/types/tab-id';

@customElement('device-tab-content')
export class DeviceTabContent extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object }) model!: DeviceStateModel;
  @property({ type: Object }) errors: Record<string, string> = {};
  @property({ type: Array }) tags: string[] = [];
  @property({ type: String }) mode: 'new' | 'edit' = 'edit';
  @property({ type: String }) activeTab: TabId = 'general';

  render() {
    if (!this.model) return null;

    return html`
      <div class="bg-white border border-slate-200 rounded-b-md p-2 md:p-4">
        ${this.activeTab === 'general'
          ? html`
              <dev-config-general
                .model=${this.model}
                .errors=${this.errors}
                .mode=${this.mode}
                .tags=${this.tags}
                @dev-field-change=${this._relayFieldChange}
                @dev-tag-picked=${this._relayTagPicked}
              ></dev-config-general>
            `
          : this.activeTab === 'hw-comm'
          ? html`
              <dev-config-hw-comm
                .model=${this.model}
                .errors=${this.errors}
                @dev-field-change=${this._relayFieldChange}
              ></dev-config-hw-comm>
            `
          : this.activeTab === 'mqtt'
          ? html`
              <dev-config-mqtt
                .model=${{ tags: this.tags }}
                .deviceList=${this.tags
                  .map((tag) => getByTag(tag))
                  .filter(Boolean)}
              ></dev-config-mqtt>
            `
          : html`
              <dev-config-loc-meta
                .model=${this.model}
                @dev-field-change=${this._relayFieldChange}
              ></dev-config-loc-meta>
            `}
      </div>
    `;
  }

  private _relayFieldChange(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('dev-field-change', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _relayTagPicked(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('dev-tag-picked', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}
