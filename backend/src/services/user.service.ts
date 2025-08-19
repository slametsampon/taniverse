import { SQLite } from '../db/sqlite';
import bcrypt from 'bcryptjs';
import type { UserBase, UserRecord } from '@models/user.model';

export class UserService {
  static getAll(): Omit<UserRecord, 'passwordHash'>[] {
    const rows = SQLite.db.prepare(`SELECT * FROM users`).all() as UserRecord[];
    return rows.map(({ passwordHash, ...safe }) => safe);
  }

  static get(username: string): Omit<UserRecord, 'passwordHash'> | null {
    const row = SQLite.db
      .prepare(`SELECT * FROM users WHERE username=?`)
      .get(username) as UserRecord | undefined;
    if (!row) return null;
    const { passwordHash, ...safe } = row;
    return safe;
  }

  /** create or update; hash password if provided */
  static upsert(input: UserBase): Omit<UserRecord, 'passwordHash'> {
    const now = Date.now();

    // ambil existing (untuk mempertahankan hash bila tidak ada password baru)
    const existing = SQLite.db
      .prepare(`SELECT * FROM users WHERE username=?`)
      .get(input.username) as UserRecord | undefined;

    const passwordHash = input.password
      ? bcrypt.hashSync(input.password, 10)
      : existing?.passwordHash ??
        (() => {
          throw new Error('Password required for new user');
        })();

    SQLite.db
      .prepare(
        `
      INSERT INTO users (username, passwordHash, role, avatarUrl, createdAt, updatedAt)
      VALUES (@username, @passwordHash, @role, @avatarUrl, @createdAt, @updatedAt)
      ON CONFLICT(username) DO UPDATE SET
        passwordHash = excluded.passwordHash,
        role        = excluded.role,
        avatarUrl   = excluded.avatarUrl,
        updatedAt   = excluded.updatedAt
    `
      )
      .run({
        username: input.username,
        passwordHash,
        role: input.role,
        avatarUrl: input.avatarUrl ?? null,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      });

    return this.get(input.username)!;
  }

  /** menerima array UserBase atau objek { users: UserBase[] } */
  static bulkUpsert(payload: UserBase[] | { users: UserBase[] }): {
    inserted: number;
  } {
    const list = Array.isArray(payload) ? payload : payload?.users ?? [];
    const tx = SQLite.db.transaction((arr: UserBase[]) => {
      for (const u of arr) this.upsert(u);
    });
    tx(list);
    return { inserted: list.length };
  }

  static delete(username: string): boolean {
    const res = SQLite.db
      .prepare(`DELETE FROM users WHERE username=?`)
      .run(username);
    return res.changes > 0;
  }

  /** Auth */
  static verify(
    username: string,
    password: string
  ): Omit<UserRecord, 'passwordHash'> | null {
    const row = SQLite.db
      .prepare(`SELECT * FROM users WHERE username=?`)
      .get(username) as UserRecord | undefined;
    if (!row) return null;
    if (!bcrypt.compareSync(password, row.passwordHash)) return null;
    const { passwordHash, ...safe } = row;
    return safe;
  }
}
