// frontend/src/components/event-filter.ts
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { EventType, SourceType } from '@models/event.model';

type FilterState = {
  sourceType: SourceType | '';
  eventType: EventType | '';
  startTime: string;
  endTime: string;
};

@customElement('event-filter')
export class EventFilter extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object }) filters: FilterState = {
    sourceType: '',
    eventType: '',
    startTime: '',
    endTime: '',
  };

  @state() private internal: FilterState = { ...this.filters };

  updated(changed: Map<string, any>) {
    if (changed.has('filters')) {
      this.internal = { ...this.filters };
    }
  }

  private emitFilterChanged() {
    this.dispatchEvent(
      new CustomEvent('filter-changed', {
        detail: { ...this.internal },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInput(e: Event) {
    const el = e.target as HTMLInputElement | HTMLSelectElement;
    const name = el.name as keyof FilterState;
    const value = el.value;

    this.internal = { ...this.internal, [name]: value };
    this.emitFilterChanged();
  }

  private resetTime() {
    this.internal = {
      ...this.internal,
      startTime: '',
      endTime: '',
    };
    this.emitFilterChanged();

    const startInput = this.renderRoot.querySelector<HTMLInputElement>(
      'input[name="startTime"]'
    );
    const endInput = this.renderRoot.querySelector<HTMLInputElement>(
      'input[name="endTime"]'
    );
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
  }

  render() {
    return html`
      <div class="mb-4 flex flex-wrap gap-4 items-end text-sm">
        <!-- Source Type -->
        <div class="flex flex-col min-w-[160px]">
          <label class="text-xs font-bold text-gray-600 mb-1"
            >Source Type</label
          >
          <select
            name="sourceType"
            class="border border-gray-300 px-3 py-1 rounded"
            @change=${this.handleInput}
            .value=${this.internal.sourceType}
          >
            <option value="">All Sources</option>
            <option value="device">Device</option>
            <option value="batch">Batch</option>
            <option value="user">User</option>
          </select>
        </div>

        <!-- Event Type -->
        <div class="flex flex-col min-w-[160px]">
          <label class="text-xs font-bold text-gray-600 mb-1">Event Type</label>
          <select
            name="eventType"
            class="border border-gray-300 px-3 py-1 rounded"
            @change=${this.handleInput}
            .value=${this.internal.eventType}
          >
            <option value="">All Types</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="alarm">Alarm</option>
            <option value="connection">Connection</option>
            <option value="action">Action</option>
            <option value="status">Status</option>
            <option value="error">Error</option>
            <option value="info">Info</option>
          </select>
        </div>

        <!-- Time Range -->
        <div class="flex flex-row gap-4">
          <!-- Start -->
          <div class="flex flex-col min-w-[180px]">
            <label class="text-xs font-bold text-gray-600 mb-1"
              >Start Time</label
            >
            <input
              name="startTime"
              type="datetime-local"
              class="border border-gray-300 px-3 py-1 rounded"
              @change=${this.handleInput}
              .value=${this.internal.startTime}
            />
          </div>

          <!-- End -->
          <div class="flex flex-col min-w-[180px]">
            <label class="text-xs font-bold text-gray-600 mb-1">End Time</label>
            <input
              name="endTime"
              type="datetime-local"
              class="border border-gray-300 px-3 py-1 rounded"
              @change=${this.handleInput}
              .value=${this.internal.endTime}
            />
          </div>

          <!-- Reset Button -->
          <div class="flex flex-col justify-end">
            <button
              class="h-[38px] px-3 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded"
              @click=${this.resetTime}
            >
              Reset Time
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
