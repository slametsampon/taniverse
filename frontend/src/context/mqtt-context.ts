// frontend/src/context/mqtt-context.ts
import { createContext } from '@lit/context';
import mqtt, { MqttClient } from 'mqtt';
import { isMockMode, setMockMode } from '../services/mode';
import { devicesStore } from '../services/devices-service';

export type MqttMode = 'mqtt' | 'mock';

export interface MqttContextValue {
  mode: MqttMode;
  isConnected: boolean;
  lastMessage: {
    topic: string;
    payload: string;
  } | null;
  client: MqttClient | null;
  toggleMode: () => Promise<void>;
  publish: (topic: string, payload: string) => void;
}

export const mqttContext = createContext<MqttContextValue>('mqtt-context');

function getCurrentMode(): MqttMode {
  return isMockMode() ? 'mock' : 'mqtt';
}

export function createMqttContext(): MqttContextValue {
  const mode = getCurrentMode(); // ← fresh, selalu benar
  let mqttClient: MqttClient | null = null;
  let connected = false;
  let lastMessage: { topic: string; payload: string } | null = null;

  if (mode === 'mqtt') {
    mqttClient = mqtt.connect('ws://localhost:9001', {
      clean: true,
      reconnectPeriod: 2000,
    });

    mqttClient.on('connect', () => {
      connected = true;
      console.info('[mqtt] ✅ Connected to broker');
    });

    mqttClient.on('close', () => {
      connected = false;
      console.warn('[mqtt] 🔌 Connection closed');
    });

    mqttClient.on('error', (err) => {
      console.error('[mqtt] ❌ Error:', err);
    });

    mqttClient.on('message', (topic, payload) => {
      const msg = payload.toString().trim();
      lastMessage = { topic, payload: msg };
      console.debug('[mqtt] 📩 Message received:', { topic, msg });
    });
  } else {
    console.info('[mqttContext] 🚧 Running in MOCK mode');
  }

  return {
    mode,
    isConnected: connected,
    lastMessage,
    client: mqttClient,
    async toggleMode() {
      const nextMode = getCurrentMode() === 'mock' ? 'mqtt' : 'mock';
      setMockMode(nextMode === 'mock');
      console.warn(`[mqttContext] 🔁 Switching to: ${nextMode}`);

      await devicesStore.init();

      window.dispatchEvent(
        new CustomEvent('mqtt:context-updated', {
          detail: createMqttContext(),
        })
      );
    },
    publish(topic, payload) {
      if (mqttClient?.connected) {
        mqttClient.publish(topic, payload);
        console.info('[mqtt] 🚀 Published:', { topic, payload });
      } else {
        console.warn('[mqtt] ❌ Cannot publish — not connected');
      }
    },
  };
}
