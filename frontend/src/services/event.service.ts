// frontend/src/services/event.service.ts

import { getEventRepository } from '../repositories/factory';

const repo = getEventRepository();

export const fetchAllEvents = () => repo.getAll();
export const fetchEventById = (id: string) => repo.getById(id);
