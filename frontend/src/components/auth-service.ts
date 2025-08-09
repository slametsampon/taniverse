// frontend/src/components/auth-service.ts
export type AuthUser = { username: string; avatarUrl?: string; token: string };

/**
 * Set true untuk testing tanpa backend (pakai JSON statis).
 * Nanti saat backend siap, ubah ke false agar pakai /api/login.
 */
const USE_MOCK = true;

// Sesuaikan base path agar fetch ke assets tetap benar di GitHub Pages.
const BASE_PATH = location.hostname === '127.0.0.1' ? '/' : '/taniverse/';

export class AuthService {
  private static KEY = 'auth_token_v1';
  private static USER = 'auth_user_v1';

  static async login(username: string, password: string): Promise<AuthUser> {
    if (USE_MOCK) {
      // --- MODE MOCK: baca JSON statis ---
      const list = await this._readMockUsers();
      const found = list.find(
        (u) =>
          u.username?.toLowerCase() === username.toLowerCase() &&
          String(u.password) === String(password)
      );
      // Simulasikan latency
      await new Promise((r) => setTimeout(r, 400));

      if (!found) {
        throw new Error('Login gagal (MOCK): username/password salah.');
      }

      const token = `mock-${found.username}-${Date.now()}`;
      const user = {
        username: found.username,
        avatarUrl: found.avatarUrl ?? '',
      };

      localStorage.setItem(this.KEY, token);
      localStorage.setItem(this.USER, JSON.stringify(user));
      return { ...user, token };
    } else {
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
      };

      localStorage.setItem(this.KEY, data.token);
      localStorage.setItem(
        this.USER,
        JSON.stringify({
          username: data.username,
          avatarUrl: data.avatarUrl ?? '',
        })
      );

      return {
        username: data.username,
        avatarUrl: data.avatarUrl ?? '',
        token: data.token,
      };
    }
  }

  static logout() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.USER);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  static getUser(): { username: string; avatarUrl: string } | null {
    const raw = localStorage.getItem(this.USER);
    if (!raw) return null;
    try {
      const j = JSON.parse(raw);
      return { username: j.username ?? 'Guest', avatarUrl: j.avatarUrl ?? '' };
    } catch {
      return null;
    }
  }

  static isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ===== helpers =====
  private static async _readMockUsers(): Promise<
    Array<{ username: string; password: string; avatarUrl?: string }>
  > {
    // publicPath dari esbuild (di-define ke string literal oleh bundler)
    const ENV = (process.env.NODE_ENV as string) || 'development';

    // Sesuaikan base untuk GitHub Pages saat pre-release
    const BASE =
      ENV === 'pre-release' ? '/taniverse/' : ENV === 'production' ? '' : '/';

    // Kita coba 2 lokasi:
    // - build/serve:   <BASE>assets/mock/users.json
    // - dev (src langsung via live-server): <BASE>src/assets/mock/users.json
    const candidates = [
      `${BASE}assets/mock/users.json`,
      `${BASE}src/assets/mock/users.json`,
    ];

    let lastErr: any = null;
    for (const url of candidates) {
      console.log(`Mencoba membaca ${url}...`);
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { users?: any[] };
        return Array.isArray(data.users) ? (data.users as any[]) : [];
      } catch (e) {
        lastErr = e;
      }
    }
    throw new Error(
      `Gagal memuat users.json (MOCK). ${lastErr?.message ?? ''}`
    );
  }
}
