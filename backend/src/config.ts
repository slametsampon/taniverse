import { join } from 'node:path';

export const config = {
  PORT: Number(process.env.PORT ?? 8080),
  DB_PATH:
    process.env.DB_PATH ??
    join(process.cwd(), 'backend', 'data', 'taniverse.db'),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',

  // === tambahan untuk Step 1 ===
  MQTT_URL: process.env.MQTT_URL ?? 'ws://localhost:9001', // ws:// untuk WebSocket; pakai mqtt://host:1883 kalau TCP
  LOG_PERIOD_MS: Number(process.env.LOG_PERIOD_MS ?? 15000),
  LOGGING_AUTO_START: process.env.LOGGING_AUTO_START === '1', // auto start logging saat boot
} as const;
