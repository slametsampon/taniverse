// models/base-batch.model.ts

export interface BaseBatch {
  id: string;
  location: string;
  description: string; // deskripsi batch (bebas, bisa ditampilkan di UI)
  startDate: string; // format ISO (YYYY-MM-DD)
  expectedHarvestDate: string;
  status: 'Planted' | 'Growing' | 'Harvested' | 'Failed'; // bisa dibatasi di turunan
  note?: string;

  // Optional physical dimensions (in centimeters)
  length?: number; // cm
  width?: number; // cm
  height?: number; // cm (or depth for aquatic)
}
