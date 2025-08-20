import type { FastifyPluginAsync } from 'fastify';
import { UserService } from '../services/user.service';
import type { UserBase } from '@models/user.model';

console.log('[users.route.ts] Loaded ✅');

const usersRoute: FastifyPluginAsync = async (app) => {
  app.get('/users', async () => UserService.getAll());

  app.get<{ Params: { username: string } }>(
    '/users/:username',
    async (req, rep) => {
      const u = UserService.get(req.params.username);
      return u ?? rep.code(404).send({ message: 'Not found' });
    }
  );

  app.post<{ Body: UserBase }>('/users', async (req, rep) => {
    console.log('[POST /users] body:', req.body);

    try {
      const saved = UserService.upsert(req.body);
      console.log('[POST /users] saved:', saved);

      if (!saved) {
        return rep.code(500).send({ message: 'Gagal menyimpan user' });
      }

      return rep.code(201).send(saved);
    } catch (err: any) {
      console.error('[POST /users] error:', err);
      return rep.code(400).send({ message: err.message ?? 'Bad request' });
    }
  });

  app.post<{ Body: UserBase[] | { users: UserBase[] } }>(
    '/users/bulk',
    async (req) => {
      return UserService.bulkUpsert(req.body);
    }
  );

  app.put<{ Params: { username: string }; Body: UserBase }>(
    '/users/:username',
    async (req, rep) => {
      if (req.params.username !== req.body.username) {
        return rep.code(400).send({ message: 'username mismatch' });
      }
      const saved = UserService.upsert(req.body);
      return saved;
    }
  );

  app.delete<{ Params: { username: string } }>(
    '/users/:username',
    async (req, rep) => {
      const ok = UserService.delete(req.params.username);
      return ok
        ? { deleted: req.params.username }
        : rep.code(404).send({ message: 'Not found' });
    }
  );

  // login sederhana (return user tanpa hash)
  app.post<{ Body: { username: string; password: string } }>(
    '/auth/login',
    async (req, rep) => {
      const user = UserService.verify(req.body.username, req.body.password);
      return user ?? rep.code(401).send({ message: 'Invalid credentials' });
    }
  );
};

export default usersRoute;
