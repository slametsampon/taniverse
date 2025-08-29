// backend/src/api/devices.route.ts

import type { FastifyPluginAsync } from 'fastify';
import { DeviceService } from '../services/device.service';
import type { DeviceConfig } from '@models/device.model';

export const devicesRoute: FastifyPluginAsync = async (app) => {
  app.get('/devices', async () => DeviceService.getAll());

  app.get<{
    Params: { id: string };
  }>('/devices/:id', async (req, rep) => {
    const item = DeviceService.get(req.params.id);
    return item ?? rep.code(404).send({ message: 'Not found' });
  });

  app.post<{
    Body: DeviceConfig;
  }>('/devices', async (req, rep) => {
    const saved = DeviceService.upsert(req.body);
    return rep.code(201).send(saved);
  });

  app.post<{
    Body: DeviceConfig[];
  }>('/devices/bulk', async (req) => {
    const count = DeviceService.bulkUpsert(req.body);
    return { inserted: count };
  });

  app.put<{
    Params: { id: string };
    Body: DeviceConfig;
  }>('/devices/:id', async (req, rep) => {
    if (req.params.id !== req.body.tagNumber) {
      return rep.code(400).send({ message: 'id mismatch' });
    }
    const saved = DeviceService.upsert(req.body);
    return saved;
  });

  app.delete<{
    Params: { id: string };
  }>('/devices/:id', async (req, rep) => {
    const ok = DeviceService.delete(req.params.id);
    return ok
      ? { deleted: req.params.id }
      : rep.code(404).send({ message: 'Not found' });
  });
};

export default devicesRoute;
