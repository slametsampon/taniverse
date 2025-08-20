import { join } from 'node:path';

/**
 * Gunakan path absolut berbasis root project (process.cwd()),
 * sehingga DEV (tsx) maupun PROD (hasil build) selalu menunjuk
 * ke folder yang sama:  backend/data/devices.db
 */
export const config = {
  PORT: Number(process.env.PORT ?? 8080),
  DB_PATH:
    process.env.DB_PATH ??
    join(process.cwd(), 'backend', 'data', 'taniverse.db'),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
} as const;
