export const config = {
  PORT: Number(process.env.PORT ?? 8080),
  DB_PATH: process.env.DB_PATH ?? './build/data/devices.db',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
} as const;
