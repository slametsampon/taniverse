// frontend/src/components/auth-service.ts
import {
  ROLE_PERMS,
  PERMS,
  roleGte,
  type Role,
  type Perm,
} from '../components/roles';
import { API_BASE } from '../config/api-base';

export type AuthUser = {
  username: string;
  avatarUrl?: string;
  token: string;
  role?: Role;
};

/**
 * Set true untuk testing tanpa backend (pakai JSON statis).
 * Saat backend siap, ubah ke false agar pakai /api/auth/login.
 */
const USER_MOCK = false;

export class AuthService {
  private static KEY = 'auth_token_v1';
  private static USER = 'auth_user_v1';

  static async login(username: string, password: string): Promise<AuthUser> {
    if (USER_MOCK) {
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

      const fullUser: AuthUser = { ...user, token };
      window.dispatchEvent(new Event('auth:changed')); // ✅ trigger context update
      return fullUser;
    }

    // --- MODE LIVE: call backend endpoint ---
    const res = await fetch(`${API_BASE}/api/auth/login`, {
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
      username: string;
      avatarUrl?: string;
      role?: Role;
      createdAt?: number;
      updatedAt?: number;
    };

    const role = (data.role ?? 'guest') as Role;
    const token = `session-${data.username}-${Date.now()}`;

    const user: AuthUser = {
      username: data.username,
      avatarUrl: data.avatarUrl ?? '',
      role,
      token,
    };

    localStorage.setItem(this.KEY, token);
    localStorage.setItem(
      this.USER,
      JSON.stringify({
        username: user.username,
        avatarUrl: user.avatarUrl,
        role: user.role,
      })
    );

    window.dispatchEvent(new Event('auth:changed')); // ✅ trigger context update
    return user;
  }

  static logout() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.USER);
    window.dispatchEvent(new Event('auth:changed')); // ✅ trigger context update
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

  /**
   * Mengembalikan user lengkap beserta token untuk context
   */
  static getUserWithToken(): AuthUser | null {
    const user = this.getUser();
    const token = this.getToken();
    return user && token ? { ...user, token } : null;
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
    const ENV = (process.env.NODE_ENV as string) || 'development';
    const BASE =
      ENV === 'pre-release' ? '/taniverse/' : ENV === 'production' ? '' : '/';

    const candidates = [
      `${BASE}assets/mock/users.json`,
      `${BASE}src/assets/mock/users.json`,
      `${BASE}assets/mock/user.json`,
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
