// frontend/src/components/event-table.ts
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventHistory } from '@models/event.model';
import { getRowColor } from 'src/utils/color.utils';

@customElement('event-table')
export class EventTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private events: EventHistory[] = [];
  @state() private filterId: string = '';
  @state() private filterType: string = '';
  @state() private filterStartTime: string = '';
  @state() private filterEndTime: string = '';
  @state() private highlightedKey: string = '';

  async connectedCallback() {
    super.connectedCallback();
    await this.loadMockEvents();
  }

  async loadMockEvents() {
    try {
      const res = await fetch('/assets/mock/event.json');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: EventHistory[] = await res.json();

      const prevKey = this.events[0] ? this.getEventKey(this.events[0]) : '';
      const newKey = data[0] ? this.getEventKey(data[0]) : '';

      this.events = data;

      if (newKey && newKey !== prevKey) {
        this.highlightedKey = newKey;
        setTimeout(() => (this.highlightedKey = ''), 3000);
      }
    } catch (err) {
      console.error('Load failed:', err);
    }
  }

  getEventKey(e: EventHistory): string {
    return `${e.timestamp}_${e.id}`;
  }

  formatDateTime(ts: string): string {
    const date = new Date(ts);
    return date.toLocaleString('sv-SE').replace('T', ' ');
  }

  get filteredEvents(): EventHistory[] {
    const start = this.filterStartTime
      ? new Date(this.filterStartTime).getTime()
      : null;
    const end = this.filterEndTime
      ? new Date(this.filterEndTime).getTime()
      : null;

    return this.events.filter((e) => {
      const eventTime = new Date(e.timestamp).getTime();

      const matchId =
        !this.filterId ||
        e.id.toLowerCase().includes(this.filterId.trim().toLowerCase());

      const matchType =
        !this.filterType ||
        e.event.toLowerCase() === this.filterType.trim().toLowerCase();

      const matchStart = !start || eventTime >= start;
      const matchEnd = !end || eventTime <= end;

      return matchId && matchType && matchStart && matchEnd;
    });
  }

  handleFilter(e: Event) {
    const t = e.target as HTMLInputElement | HTMLSelectElement;

    switch (t.name) {
      case 'filterId':
        this.filterId = t.value;
        break;
      case 'filterType':
        this.filterType = t.value;
        break;
      case 'filterStart':
        this.filterStartTime = t.value;
        break;
      case 'filterEnd':
        this.filterEndTime = t.value;
        break;
    }
  }

  resetTimeFilter() {
    this.filterStartTime = '';
    this.filterEndTime = '';

    // Clear inputs in DOM
    const startInput = this.renderRoot.querySelector<HTMLInputElement>(
      'input[name="filterStart"]'
    );
    const endInput = this.renderRoot.querySelector<HTMLInputElement>(
      'input[name="filterEnd"]'
    );
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
  }

  render() {
    return html`
      <div class="mb-4 flex flex-wrap gap-4 items-end">
        <!-- Filter by ID -->
        <div class="flex flex-col min-w-[160px]">
          <label class="text-xs font-bold text-gray-600 mb-1"
            >Filter by ID</label
          >
          <input
            name="filterId"
            type="text"
            class="border border-gray-300 px-3 py-1 rounded text-sm"
            placeholder="e.g. TANK01"
            @input=${this.handleFilter}
          />
        </div>

        <!-- Filter by Event -->
        <div class="flex flex-col min-w-[160px]">
          <label class="text-xs font-bold text-gray-600 mb-1">Event Type</label>
          <select
            name="filterType"
            class="border border-gray-300 px-3 py-1 rounded text-sm"
            @change=${this.handleFilter}
          >
            <option value="">All Events</option>
            <option>ALARM_HI</option>
            <option>ALARM_LO</option>
            <option>STATUS</option>
            <option>ERROR</option>
            <option>INFO</option>
          </select>
        </div>
        <div class="flex flex-row gap-4">
          <!-- Start Time -->
          <div class="flex flex-col min-w-[180px]">
            <label class="text-xs font-bold text-gray-600 mb-1"
              >Start Time</label
            >
            <input
              name="filterStart"
              type="datetime-local"
              class="border border-gray-300 px-3 py-1 rounded text-sm"
              @change=${this.handleFilter}
            />
          </div>

          <!-- End Time -->
          <div class="flex flex-col min-w-[180px]">
            <label class="text-xs font-bold text-gray-600 mb-1">End Time</label>
            <input
              name="filterEnd"
              type="datetime-local"
              class="border border-gray-300 px-3 py-1 rounded text-sm"
              @change=${this.handleFilter}
            />
          </div>

          <!-- Reset Time Button -->
          <div class="flex flex-col justify-end">
            <button
              class="h-[38px] px-3 text-sm bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded flex items-center"
              @click=${this.resetTimeFilter}
            >
              Reset Time
            </button>
          </div>
        </div>

        <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table class="table-auto w-full text-sm">
            <thead
              class="bg-gray-100 text-left text-gray-700 uppercase tracking-wider"
            >
              <tr>
                <th class="px-4 py-2">Timestamp</th>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Event</th>
                <th class="px-4 py-2">Description</th>
                <th class="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              ${this.filteredEvents.map((e) => {
                const highlight =
                  this.getEventKey(e) === this.highlightedKey
                    ? 'animate-pulse ring-2 ring-yellow-400'
                    : '';

                return html`
                  <tr class="${getRowColor(e.event)} ${highlight}">
                    <td class="px-4 py-2">
                      ${this.formatDateTime(e.timestamp)}
                    </td>
                    <td class="px-4 py-2">${e.id}</td>
                    <td class="px-4 py-2 font-bold uppercase">${e.event}</td>
                    <td class="px-4 py-2">${e.description}</td>
                    <td class="px-4 py-2">${e.value}</td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
