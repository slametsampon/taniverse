export interface GrowthLog {
  id: string;
  batchId: string;
  logDate: string;
  plantAge: number;
  avgHeightCm: number;
  leafCount: number;
  leafColor: string;
  note?: string;
}
