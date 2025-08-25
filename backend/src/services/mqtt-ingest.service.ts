// backend/src/services/mqtt-ingest.service.ts
import mqtt from 'mqtt';
import { config } from '../config';
import { LoggingService } from './logging.service';

export class MqttIngestService {
  private static client: mqtt.MqttClient | null = null;

  static connect(url = config.MQTT_URL) {
    if (this.client) return;
    this.client = mqtt.connect(url, {
      // username: process.env.MQTT_USER,
      // password: process.env.MQTT_PASS,
    });

    this.client.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('[mqtt] connected to', url);
      this.client!.subscribe('sensors/+/reading', { qos: 0 }, (err) => {
        if (err) console.error('[mqtt] subscribe error', err);
      });
    });

    this.client.on('message', (_topic, payload) => {
      try {
        // Expect: { tagNumber, value, timestamp } (epoch ms)
        const msg = JSON.parse(payload.toString());
        if (
          typeof msg?.tagNumber === 'string' &&
          typeof msg?.value === 'number' &&
          typeof msg?.timestamp === 'number'
        ) {
          LoggingService.ingest(msg);
        }
      } catch {
        // eslint-disable-next-line no-console
        console.warn('[mqtt] bad payload:', payload.toString());
      }
    });

    this.client.on('error', (e) => console.error('[mqtt] error', e));
    this.client.on('close', () => console.warn('[mqtt] disconnected'));
  }
}
