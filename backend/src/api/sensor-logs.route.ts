import type { FastifyPluginAsync } from 'fastify';
import {
  SensorLogService,
  type SensorLog,
} from '../services/sensor-log.service';

export const sensorLogsRoute: FastifyPluginAsync = async (app) => {
  // INSERT single (manual/debug)
  app.post<{ Body: SensorLog }>('/sensor-logs', async (req, rep) => {
    const id = SensorLogService.insert(req.body);
    return rep.code(201).send({ id });
  });

  // INSERT bulk (manual/debug atau ingest alternatif)
  app.post<{ Body: SensorLog[] }>('/sensor-logs/bulk', async (req, rep) => {
    const inserted = SensorLogService.bulkInsert(req.body ?? []);
    // opsional housekeeping ringan
    // SensorLogService.pruneOlderThan(90);
    return rep.code(201).send({ inserted });
  });

  // READ recent
  app.get<{ Querystring: { tag: string; limit?: number } }>(
    '/sensor-logs/recent',
    async (req) => {
      return SensorLogService.getRecent(req.query.tag, req.query.limit ?? 100);
    }
  );

  // READ range
  app.get<{ Querystring: { tag: string; start: number; end: number } }>(
    '/sensor-logs/range',
    async (req) => {
      return SensorLogService.getRange(
        req.query.tag,
        req.query.start,
        req.query.end
      );
    }
  );
};

export default sensorLogsRoute;
