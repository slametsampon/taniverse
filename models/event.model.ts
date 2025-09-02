// models/event.model.ts

export interface EventHistory {
  timestamp: string;
  id: string;
  description: string;
  event: string;
  value: number | string;
}
