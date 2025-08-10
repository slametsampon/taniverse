// frontend/src/components/auth-service.ts
import { ROLE_PERMS, PERMS, roleGte, type Role, type Perm } from './roles';

export type AuthUser = {
  username: string;
  avatarUrl?: string;
  token: string;
  role?: Role;
};

/**
 * Set true untuk testing tanpa backend (pakai JSON statis).
 * Saat backend siap, ubah ke false agar pakai /api/login.
 */
const USE_MOCK = true;

export class AuthService {
  private static KEY = 'auth_token_v1';
  private static USER = 'auth_user_v1';

  static async login(username: string, password: string): Promise<AuthUser> {
    if (USE_MOCK) {
      const list = await this._readMockUsers();
      const found = list.find(
        (u) =>
          String(u.username).toLowerCase() === username.toLowerCase() &&
          String(u.password) === String(password)
      );
      await new Promise((r) => setTimeout(r, 300));
      if (!found)
        throw new Error('Login gagal (MOCK): username/password salah.');

      const token = `mock-${found.username}-${Date.now()}`;
      const role = ((found as any).role ?? 'guest')
        .toString()
        .toLowerCase() as Role;
      const user = {
        username: found.username,
        avatarUrl: found.avatarUrl ?? '',
        role,
      };

      localStorage.setItem(this.KEY, token);
      localStorage.setItem(this.USER, JSON.stringify(user));
      return { ...user, token };
    }

    // --- MODE LIVE: call endpoint backend ---
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      let msg = 'Login gagal. Periksa kredensial Anda.';
      try {
        const j = await res.json();
        if (j?.message) msg = j.message;
      } catch {}
      throw new Error(msg);
    }

    const data = (await res.json()) as {
      token: string;
      username: string;
      avatarUrl?: string;
      role?: Role;
    };

    const role = (data.role ?? 'guest') as Role;
    localStorage.setItem(this.KEY, data.token);
    localStorage.setItem(
      this.USER,
      JSON.stringify({
        username: data.username,
        avatarUrl: data.avatarUrl ?? '',
        role,
      })
    );

    return {
      username: data.username,
      avatarUrl: data.avatarUrl ?? '',
      role,
      token: data.token,
    };
  }

  static logout() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.USER);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  static getUser(): {
    username: string;
    avatarUrl: string;
    role?: Role;
  } | null {
    const raw = localStorage.getItem(this.USER);
    if (!raw) return null;
    try {
      const j = JSON.parse(raw);
      const role = j.role ? (String(j.role).toLowerCase() as Role) : undefined;
      return {
        username: j.username ?? 'Guest',
        avatarUrl: j.avatarUrl ?? '',
        role,
      };
    } catch {
      return null;
    }
  }

  static isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // === RBAC helpers ===
  static hasRole(role: Role): boolean {
    const u = this.getUser();
    return !!u?.role && u.role === role;
  }

  static hasRoleAtLeast(minRole: Role): boolean {
    const u = this.getUser();
    if (!u?.role) return false;
    return roleGte(u.role, minRole);
  }

  static can(perm: Perm): boolean {
    const u = this.getUser();
    if (!u?.role) return false;
    if (u.role === 'admin') return true;
    return ROLE_PERMS[u.role].includes(perm);
  }

  // ===== helpers =====
  private static async _readMockUsers(): Promise<
    Array<{
      username: string;
      password: string;
      avatarUrl?: string;
      role?: Role;
    }>
  > {
    // Deteksi environment dari esbuild define
    const ENV = (process.env.NODE_ENV as string) || 'development';
    const BASE =
      ENV === 'pre-release' ? '/taniverse/' : ENV === 'production' ? '' : '/';

    const candidates = [
      `${BASE}assets/mock/users.json`, // bila serve hasil build
      `${BASE}src/assets/mock/users.json`, // bila serve source (live-server dari frontend/)
      `${BASE}assets/mock/user.json`, // fallback nama file tunggal
      `${BASE}src/assets/mock/user.json`,
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) continue;
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.users)
          ? data.users
          : [];
        if (Array.isArray(list)) return list as any[];
      } catch {}
    }
    // embedded fallback agar tetap bisa test
    console.warn(
      '[AuthService] users.json tidak ditemukan, pakai data embedded.'
    );
    return [
      {
        username: 'admin',
        password: 'admin123',
        role: 'admin' as Role,
        avatarUrl: 'https://i.pravatar.cc/100?img=1',
      },
      {
        username: 'engineer',
        password: 'engineer123',
        role: 'engineer' as Role,
        avatarUrl: 'https://i.pravatar.cc/100?img=3',
      },
      {
        username: 'operator',
        password: 'operator123',
        role: 'operator' as Role,
        avatarUrl: 'https://i.pravatar.cc/100?img=2',
      },
      {
        username: 'guest',
        password: 'guest123',
        role: 'guest' as Role,
        avatarUrl: 'https://i.pravatar.cc/100?img=4',
      },
    ];
  }
}

export { PERMS, type Perm, type Role };
