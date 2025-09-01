// models/hydroponic-batch.model.ts
export interface HydroponicBatch {
  id: string;
  plantId: string;
  code: string;
  system: 'NFT' | 'DFT' | 'DWC' | 'Aeroponik' | string; // jenis sistem hidroponik
  location: string; // rak / gully / modul
  startDate: string; // ISO
  expectedHarvestDate: string;
  initialCount: number; // jumlah lubang tanam terpakai
  currentCount: number; // total bibit ditanam
  status: 'Planted' | 'Harvested' | 'Failed';
  note?: string;
}
