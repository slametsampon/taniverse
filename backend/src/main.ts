import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config';
import devicesRoute from './api/devices.route';

async function bootstrap() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: config.CORS_ORIGIN });
  await app.register(devicesRoute, { prefix: '/api' });

  await app.listen({ port: config.PORT, host: '0.0.0.0' });
}

bootstrap().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
