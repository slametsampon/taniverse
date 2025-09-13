// frontend/src/components/event-table.ts
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { EventHistory, SourceType, EventType } from '@models/event.model';
import { fetchAllEvents } from 'src/services/event.service';
import { getRowColor } from 'src/utils/color.utils';
import { eventColumns } from 'src/schema/event-columns';
import './event-filter';

@customElement('event-table')
export class EventTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private events: EventHistory[] = [];
  @state() private filterSource: SourceType | '' = '';
  @state() private filterType: EventType | '' = '';
  @state() private filterStartTime = '';
  @state() private filterEndTime = '';
  @state() private highlightedKey = '';

  async connectedCallback() {
    super.connectedCallback();
    await this.loadEvents();
  }

  async loadEvents() {
    try {
      const data = await fetchAllEvents();
      const prevKey = this.events[0] ? this.getKey(this.events[0]) : '';
      const newKey = data[0] ? this.getKey(data[0]) : '';

      this.events = data;

      if (newKey && newKey !== prevKey) {
        this.highlightedKey = newKey;
        setTimeout(() => (this.highlightedKey = ''), 3000);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    }
  }

  getKey(e: EventHistory) {
    return `${e.timestamp}_${e.id}`;
  }

  formatDateTime(ts: string) {
    return new Date(ts).toLocaleString('sv-SE').replace('T', ' ');
  }

  get filteredEvents(): EventHistory[] {
    const start = this.filterStartTime
      ? new Date(this.filterStartTime).getTime()
      : null;
    const end = this.filterEndTime
      ? new Date(this.filterEndTime).getTime()
      : null;

    return this.events.filter((e) => {
      const t = new Date(e.timestamp).getTime();
      const matchSource =
        !this.filterSource || e.sourceType === this.filterSource;
      const matchType = !this.filterType || e.eventType === this.filterType;
      const matchStart = !start || t >= start;
      const matchEnd = !end || t <= end;
      return matchSource && matchType && matchStart && matchEnd;
    });
  }

  handleFilter(e: Event) {
    const el = e.target as HTMLInputElement | HTMLSelectElement;
    switch (el.name) {
      case 'filterSource':
        this.filterSource = el.value as SourceType;
        break;
      case 'filterType':
        this.filterType = el.value as EventType;
        break;
      case 'filterStart':
        this.filterStartTime = el.value;
        break;
      case 'filterEnd':
        this.filterEndTime = el.value;
        break;
    }
  }

  resetTimeFilter() {
    this.filterStartTime = '';
    this.filterEndTime = '';
    (
      this.renderRoot.querySelector(
        'input[name="filterStart"]'
      ) as HTMLInputElement
    ).value = '';
    (
      this.renderRoot.querySelector(
        'input[name="filterEnd"]'
      ) as HTMLInputElement
    ).value = '';
  }

  render() {
    return html`
      <event-filter
        .filters=${{
          sourceType: this.filterSource,
          eventType: this.filterType,
          startTime: this.filterStartTime,
          endTime: this.filterEndTime,
        }}
        @filter-changed=${(e: CustomEvent) => {
          const f = e.detail;
          this.filterSource = f.sourceType;
          this.filterType = f.eventType;
          this.filterStartTime = f.startTime;
          this.filterEndTime = f.endTime;
        }}
      ></event-filter>

      <!-- Event Table -->
      <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table class="table-auto w-full text-sm">
          <thead>
            <tr>
              ${eventColumns.map(
                (col) => html`
                  <th class="px-4 py-2 text-xs font-bold uppercase text-left">
                    ${col.label}
                  </th>
                `
              )}
            </tr>
          </thead>
          <tbody>
            ${this.filteredEvents.map((e) => {
              const rowColor = getRowColor(e.eventType);
              const highlight =
                this.getKey(e) === this.highlightedKey
                  ? 'animate-pulse ring-2 ring-yellow-400'
                  : '';

              return html`
                <tr class="${rowColor} ${highlight}">
                  ${eventColumns.map(
                    (col) => html`
                      <td class="px-4 py-2 whitespace-nowrap">
                        ${col.render
                          ? col.render(e)
                          : e[col.key as keyof EventHistory] ?? '-'}
                      </td>
                    `
                  )}
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}
