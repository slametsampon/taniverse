// models/event.model.ts

export type SourceType = 'device' | 'batch' | 'user';

export type EventType =
  | 'create'
  | 'update'
  | 'delete'
  | 'alarm'
  | 'connection'
  | 'action';

export interface EventHistory {
  id: string;
  timestamp: string; // ISO string
  sourceType: SourceType; // 'device', 'batch', 'user'
  sourceId: string; // tagNumber, batchId, userId
  eventType: EventType; // sesuai enum
  field: string; // nama field yang berubah
  prevValue?: string | number;
  newValue?: string | number;
  triggeredBy?: string; // user id / system
  description?: string;
}
