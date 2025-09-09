// frontend/src/services/livestock.service.ts
import type { Livestock } from '@models/livestock.model';
import { getLivestockRepository } from 'src/repositories/repository-factory';

const repo = getLivestockRepository();

export const fetchAllLivestock = (): Promise<Livestock[]> => repo.getAll();
export const fetchLivestockById = (id: string): Promise<Livestock | null> =>
  repo.getById(id);
