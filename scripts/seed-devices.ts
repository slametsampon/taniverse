// backend/scripts/seed-devices.ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DeviceService } from '../backend/src/services/device.service';
import type { DeviceConfig } from '../models/device.model';

async function main() {
  const file = process.argv[2] ?? '../frontend/src/assets/mock/devices.json';
  const path = resolve(__dirname, file);
  const raw = readFileSync(path, 'utf8');
  const data = JSON.parse(raw) as DeviceConfig[];

  const count = DeviceService.bulkUpsert(data);
  // eslint-disable-next-line no-console
  console.log(`[seed] devices inserted/updated: ${count}`);
}

main();
