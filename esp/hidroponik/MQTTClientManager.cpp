#include "MQTTClientManager.h"

MQTTClientManager::MQTTClientManager() : mqttClient(wifiClient) {}

void MQTTClientManager::setup(const char* broker, int port) {
  mqttClient.setServer(broker, port);
}

void MQTTClientManager::connect(const char* clientId) {
  while (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT...");
    if (mqttClient.connect(clientId)) {
      Serial.println(" connected!");
    } else {
      Serial.print(" failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5s");
      delay(5000);
    }
  }
}

void MQTTClientManager::loop() {
  mqttClient.loop();
}

void MQTTClientManager::publishSensorData(const char* topic, const String& payload) {
  mqttClient.publish(topic, payload.c_str());
  Serial.println("Published: " + payload);
}

bool MQTTClientManager::isConnected() {
  return mqttClient.connected();
}
