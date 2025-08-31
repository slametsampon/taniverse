// frontend/src/pages/konfigurasi/device-ui.ts

/**
 * Fungsi utilitas UI untuk halaman konfigurasi device.
 * Tidak menyimpan state, hanya bantu rendering atau efek visual.
 */

export class DeviceUI {
  /**
   * Kelas Tailwind untuk segmented button (mode switch)
   */
  static btnCls(active: boolean): string {
    const base =
      'relative px-3 md:px-4 py-1.5 rounded-md text-sm font-medium ' +
      'transition-colors select-none ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';
    const on = 'bg-white text-slate-900 shadow ring-1 ring-slate-200';
    const off = 'text-slate-600 hover:text-slate-900 hover:bg-white/60';
    return `${base} ${active ? on : off}`;
  }

  /**
   * Tampilkan toast sementara (berbasis DOM langsung)
   */
  static showToast(msg: string, error = false): void {
    const el = document.createElement('div');
    el.textContent = msg;
    el.className =
      `fixed z-50 bottom-4 right-4 px-3 py-2 rounded shadow ` +
      `${error ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }
}
