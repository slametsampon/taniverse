// backend/src/services/logging.service.ts
import { SensorLogService } from './sensor-log.service';
import { config } from '../config';

export type Reading = { tagNumber: string; value: number; timestamp: number };

export class LoggingService {
  private static active = false;
  private static timer: NodeJS.Timeout | null = null;
  private static readonly PERIOD_MS = config.LOG_PERIOD_MS;
  private static buffer: Reading[] = [];

  static isActive() {
    return this.active;
  }

  static start() {
    if (this.active) return;
    this.active = true;
    this.timer = setInterval(() => this.flush(), this.PERIOD_MS);
    // opsi: flush awal
    // this.flush();
    // eslint-disable-next-line no-console
    console.log(`[logging] started (period=${this.PERIOD_MS}ms)`);
  }

  static stop() {
    if (!this.active) return;
    this.active = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.flush(); // final flush
    // eslint-disable-next-line no-console
    console.log('[logging] stopped');
  }

  static ingest(r: Reading | Reading[]) {
    if (!r) return;
    if (Array.isArray(r)) this.buffer.push(...r);
    else this.buffer.push(r);
  }

  static flush() {
    if (!this.buffer.length) return;
    const batch = this.buffer.splice(0, this.buffer.length);
    try {
      SensorLogService.bulkInsert(batch);
      // Opsional: pruning ringan (mis. > 90 hari)
      // SensorLogService.pruneOlderThan(90);
      // eslint-disable-next-line no-console
      console.log(`[logging] flushed ${batch.length} rows`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[logging] flush error:', e);
      // kembalikan batch ke buffer (best effort no-loss)
      this.buffer.unshift(...batch);
    }
  }
}
