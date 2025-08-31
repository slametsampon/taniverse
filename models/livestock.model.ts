// models/livestock.model.ts

export interface Livestock {
  id: string;
  code: string;
  name: string; // ✅ Tambahkan ini
  type: 'Sapi' | 'Kambing' | 'Ayam' | string;
  breed: string;
  image: string;
  growthDaysMin: number;
  growthDaysMax: number;
  avgWeightKg: number;
  pricePerKg: number;
  costPerHead: number;
  tempMinC: number;
  tempMaxC: number;
  phMin?: number;
  phMax?: number;
  systemType: 'Intensif' | 'Semi-Intensif' | 'Ekstensif' | string;
}
