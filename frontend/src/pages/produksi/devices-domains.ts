// frontend/src/pages/produksi/devices-domains.ts

type DomainConfig = {
  id: string;
  name: string;
  emoji: string;
  tags: string[];
  forceInit?: boolean;
  gridClass?: string;
};

export const DEVICES_DOMAINS: DomainConfig[] = [
  {
    id: 'hidroponik',
    name: 'Hidroponik',
    emoji: '🌱',
    tags: ['TI-001', 'LI-004', 'AI-005', 'AI-006', 'P-001'],
  },
  {
    id: 'hortikultura',
    name: 'Hortikultura',
    emoji: '🥬',
    tags: ['TI-401', 'AI-401', 'AI-402', 'P-401', 'P-402'],
  },
  {
    id: 'akuakultur',
    name: 'Akuakultur',
    emoji: '🐟',
    tags: ['TI-101', 'AI-105', 'AI-106', 'P-101'],
    forceInit: true,
  },
  {
    id: 'peternakan',
    name: 'Peternakan',
    emoji: '🐔',
    tags: ['TI-301', 'AI-301', 'AI-302', 'H-301', 'B-301'],
    forceInit: true,
  },
];
