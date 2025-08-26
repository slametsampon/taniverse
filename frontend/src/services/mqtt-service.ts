import mqtt from 'mqtt';

export const MQTT_BROKER_URL = 'ws://localhost:9001';
export const TOPIC_PREFIX = 'taniverse/devices';

type MessageHandler = (topic: string, payload: string) => void;
type VoidCallback = () => void;

class MqttService {
  private client: mqtt.MqttClient | null = null;
  private messageHandlers = new Set<MessageHandler>();
  private connectHandlers = new Set<VoidCallback>();
  private disconnectHandlers = new Set<VoidCallback>();
  private ready = false;

  async connect(): Promise<void> {
    if (this.ready) return;

    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(MQTT_BROKER_URL, {
        clean: true,
        reconnectPeriod: 2000,
      });

      this.client.on('connect', () => {
        this.ready = true;
        console.log('[mqttService] ✅ Connected');
        this.connectHandlers.forEach((cb) => cb());
        resolve();
      });

      this.client.on('reconnect', () => {
        console.warn('[mqttService] 🔁 Reconnecting...');
      });

      this.client.on('close', () => {
        this.ready = false;
        console.warn('[mqttService] ❌ Disconnected');
        this.disconnectHandlers.forEach((cb) => cb());
      });

      this.client.on('message', (topic, payload) => {
        const msg = new TextDecoder().decode(payload).trim();
        this.messageHandlers.forEach((cb) => cb(topic, msg));
      });

      this.client.on('error', (err) => {
        console.error('[mqttService] ❌ Connection error:', err);
        reject(err);
      });
    });
  }

  isReady() {
    return this.ready;
  }

  publish(topic: string, message: string) {
    if (!this.ready || !this.client) return;
    this.client.publish(topic, message);
  }

  subscribeTopic(topic: string) {
    this.client?.subscribe(topic, {}, (err) => {
      if (err) console.error(`[mqttService] ❌ Gagal subscribe: ${topic}`, err);
      else console.log(`[mqttService] 📡 Subscribed to ${topic}`);
    });
  }

  unsubscribeTopic(topic: string) {
    this.client?.unsubscribe(topic, {}, (err) => {
      if (err)
        console.error(`[mqttService] ❌ Gagal unsubscribe: ${topic}`, err);
      else console.log(`[mqttService] 🚫 Unsubscribed from ${topic}`);
    });
  }

  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onConnect(cb: VoidCallback) {
    this.connectHandlers.add(cb);
    return () => this.connectHandlers.delete(cb);
  }

  onDisconnect(cb: VoidCallback) {
    this.disconnectHandlers.add(cb);
    return () => this.disconnectHandlers.delete(cb);
  }
}

export const mqttService = new MqttService();
