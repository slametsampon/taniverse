// frontend/src/schema/event-columns.ts

import type { EventHistory } from '@models/event.model';
import { html } from 'lit';

export interface ColumnConfig {
  key: keyof EventHistory | 'valueChange';
  label: string;
  render?: (event: EventHistory) => string | ReturnType<typeof html>;
}

/**
 * Kolom untuk tampilan tabel log event.
 * Gunakan ini di komponen <event-table> agar struktur tabel fleksibel dan dinamis.
 */
export const eventColumns: ColumnConfig[] = [
  {
    key: 'timestamp',
    label: 'Time',
    render: (e) =>
      new Date(e.timestamp).toLocaleString('sv-SE').replace('T', ' '),
  },
  {
    key: 'sourceId',
    label: 'Source',
    render: (e) => `${e.sourceType}:${e.sourceId}`,
  },
  {
    key: 'eventType',
    label: 'Type',
    render: (e) => e.eventType.toUpperCase(),
  },
  {
    key: 'field',
    label: 'Field',
  },
  {
    key: 'valueChange',
    label: 'Change',
    render: (e) =>
      e.prevValue !== undefined && e.newValue !== undefined
        ? html`<span class="font-mono">${e.prevValue} → ${e.newValue}</span>`
        : '-',
  },
  {
    key: 'triggeredBy',
    label: 'By',
  },
  {
    key: 'description',
    label: 'Description',
  },
];
