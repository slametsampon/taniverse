import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-home')
export class PageHome extends LitElement {
  createRenderRoot() {
    return this; // use Light DOM so Tailwind works
  }

  render() {
    return html`
      <div class="p-6">
        <h1 class="text-2xl font-bold text-green-800 mb-4">
          🌿 Selamat Datang di TaniVerse
        </h1>
        <p class="text-gray-700 mb-4">
          TaniVerse adalah platform monitoring dan kontrol IoT untuk sistem
          pertanian pintar seperti:
        </p>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>🌱 Hidroponik</li>
          <li>🐟 Akuakultur</li>
          <li>🐔 Peternakan</li>
        </ul>
        <p class="mt-4 text-sm text-gray-500">
          Gunakan menu navigasi di atas untuk mulai menjelajahi dashboard dan
          histori data.
        </p>
      </div>
    `;
  }
}
