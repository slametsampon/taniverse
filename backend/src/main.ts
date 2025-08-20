import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config';
import devicesRoute from './api/devices.route';
import usersRoute from './api/users.route';
import { SQLite } from './db/sqlite'; // pastikan path ini benar

async function bootstrap() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: config.CORS_ORIGIN, // '*' atau asal FE kamu
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ⬅️ penting
    allowedHeaders: ['Content-Type', 'Authorization'], // ⬅️ penting utk JSON
    // credentials: false, // (biarkan default)
  });

  // init DB di startup (folder/file + migrate + log path)
  void SQLite.db;

  // --- HEALTH (root) ---
  app.get<{
    Reply: { ok: boolean; db: boolean; path?: string; error?: string };
  }>('/health', async (req, rep) => {
    try {
      // beri tipe hasil get()
      const row = SQLite.db.prepare('SELECT 1 AS ok').get() as
        | { ok: number }
        | undefined;

      return {
        ok: true,
        db: !!row && row.ok === 1,
        path: config.DB_PATH,
      };
    } catch (e: any) {
      return rep.code(500).send({
        ok: false,
        db: false,
        error: e?.message ?? 'unknown',
      });
    }
  });

  await app.register(devicesRoute, { prefix: '/api' });
  await app.register(usersRoute, { prefix: '/api' });

  // --- (opsional) HEALTH di /api ---
  app.get('/api/health', async () => ({ ok: true }));

  await app.listen({ port: config.PORT, host: '0.0.0.0' });
}

bootstrap().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
