import mqtt from 'mqtt';
import { devicesStore } from './devices-service'; // sesuaikan path jika berbeda

const client = mqtt.connect('ws://localhost:9001'); // ganti sesuai broker MQTT kamu

client.on('connect', () => {
  console.log('[MQTT] Connected');
  client.subscribe('hidroponik/+/value'); // contoh topic
  client.subscribe('hidroponik/+/state');
});

client.on('message', (topic, message) => {
  const parts = topic.split('/');
  const tag = parts[1]; // e.g. 'TI-001'
  const subtopic = parts[2]; // 'value' or 'state'

  try {
    const payload = JSON.parse(message.toString());

    if (subtopic === 'value') {
      devicesStore.setSensorValue(tag, payload.value);
    } else if (subtopic === 'state') {
      devicesStore.setActuatorState(tag, payload.state);
    }
  } catch (err) {
    console.error('[MQTT] Error parsing message:', err);
  }
});
