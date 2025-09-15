// models/trending.model.ts

export interface SensorDataPoint {
  tagNumber: string; // ID unik per sensor
  timestamp: number; // UNIX timestamp (detik)
  value: number; // Nilai sensor
}
