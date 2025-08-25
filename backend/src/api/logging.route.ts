// backend/src/api/logging.route.ts
import type { FastifyPluginAsync } from 'fastify';
import { LoggingService } from '../services/logging.service';

export const loggingRoute: FastifyPluginAsync = async (app) => {
  app.get('/logging/status', async () => ({
    active: LoggingService.isActive(),
  }));
  app.post('/logging/start', async () => {
    LoggingService.start();
    return { active: true };
  });
  app.post('/logging/stop', async () => {
    LoggingService.stop();
    return { active: false };
  });
};

export default loggingRoute;
