export interface Plant {
  id: string;
  code: string;
  name: string;
  image: string;
  growthDaysMin: number;
  growthDaysMax: number;
  heightMinCm: number;
  heightMaxCm: number;
  avgWeightG: number;
  pricePerKg: number;
  costPerPlant: number;
  ecMin: number;
  ecMax: number;
  phMin: number;
  phMax: number;
  hydroponicSystem: 'NFT' | 'DFT' | 'Wick' | 'DWC' | 'DutchBucket' | string;
}
