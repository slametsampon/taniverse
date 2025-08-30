// frontend/src/pages/produksi/hidroponik.ts

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// import type definitions dari models
import type { Plant } from '@models/plant.model';
import type { PlantingBatch } from '@models/batch.model';
import type { HarvestResult } from '@models/harvest-result.model';
import '../../components/dialogs/plant-detail-dialog'; // pastikan path sesuai

@customElement('hidroponik-page')
export class PageProduksiHidroponik extends LitElement {
  createRenderRoot() {
    return this; // gunakan light DOM supaya Tailwind bekerja
  }

  @state() plants: Plant[] = [];
  @state() batches: PlantingBatch[] = [];
  @state() harvests: HarvestResult[] = [];
  @state()
  private selectedPlant: Plant | null = null;

  @state()
  private showDialog = false;

  private showPlantDetail(plant: Plant | undefined) {
    console.log('[showPlantDetail] Trigger global dialog');

    const dialogEl = document.querySelector('plant-detail-dialog') as any;
    if (dialogEl) {
      dialogEl.plant = plant;
      dialogEl.show(); // pastikan method ini ada
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    // load mock data dari src/assets/mock
    this.plants = await (await fetch('/assets/mock/plants.json')).json();
    this.batches = await (await fetch('/assets/mock/batches.json')).json();
    this.harvests = await (await fetch('/assets/mock/harvests.json')).json();
  }

  render() {
    return html`
      <section class="p-4 space-y-6">
        <h1 class="text-2xl font-bold mb-2">🌱 Produksi Hidroponik</h1>

        <!-- Daftar Batch -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Batch Aktif</h2>
          <table
            class="table-auto border-collapse border border-gray-300 w-full text-sm"
          >
            <thead class="bg-green-100">
              <tr>
                <th class="border px-2 py-1">Kode</th>
                <th class="border px-2 py-1">Tanaman</th>
                <th class="border px-2 py-1">Mulai</th>
                <th class="border px-2 py-1">Estimasi Panen</th>
                <th class="border px-2 py-1">Total Tanaman</th>
                <th class="border px-2 py-1">Lokasi</th>
                <th class="border px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.batches.map((b) => {
                const plant = this.plants.find((p) => p.id === b.plantId);
                return html`
                  <tr>
                    <td class="border px-2 py-1">${b.code}</td>
                    <td
                      class="border px-2 py-1 cursor-pointer text-blue-600 hover:underline"
                      @click=${() => {
                        console.log('[PLANT CLICKED]', plant);
                        this.showPlantDetail(plant);
                      }}
                    >
                      ${plant?.name || b.plantId}
                    </td>

                    <td class="border px-2 py-1">
                      ${this.formatDate(b.startDate)}
                    </td>
                    <td class="border px-2 py-1">
                      ${this.formatDate(b.expectedHarvestDate)}
                    </td>
                    <td class="border px-2 py-1 text-center">
                      ${b.totalPlants}
                    </td>
                    <td class="border px-2 py-1">${b.location}</td>
                    <td class="border px-2 py-1">${b.status}</td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>

        <!-- Hasil Panen -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <table
            class="table-auto border-collapse border border-gray-300 w-full text-sm"
          >
            <thead class="bg-green-100">
              <tr>
                <th class="border px-2 py-1">Batch</th>
                <th class="border px-2 py-1">Tanggal Panen</th>
                <th class="border px-2 py-1">Berat Total (g)</th>
                <th class="border px-2 py-1">Pendapatan (Rp)</th>
                <th class="border px-2 py-1">Laba (Rp)</th>
              </tr>
            </thead>
            <tbody>
              ${this.harvests.map((h) => {
                const batch = this.batches.find((b) => b.id === h.batchId);
                return html`
                  <tr>
                    <td class="border px-2 py-1">
                      ${batch?.code || h.batchId}
                    </td>
                    <td class="border px-2 py-1">
                      ${this.formatDate(h.harvestDate)}
                    </td>
                    <td class="border px-2 py-1 text-right">
                      ${h.totalWeightG}
                    </td>
                    <td class="border px-2 py-1 text-right">
                      ${h.revenue.toLocaleString()}
                    </td>
                    <td class="border px-2 py-1 text-right">
                      ${h.netProfit.toLocaleString()}
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }
  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short', // atau 'long' untuk nama bulan lengkap
      year: 'numeric',
    }).format(d);
  }
}
