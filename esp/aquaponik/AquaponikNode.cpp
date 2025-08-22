#include "AquaponikNode.h"

void AquaponikNode::setup() {
  Serial.begin(115200);
  delay(1000);

  wifiManager.connect();

  if (WiFi.status() != WL_CONNECTED) {
    ledManager.setStatus(LedStatus::WifiError);  // WiFi error
    return;
  }

  mqttManager.setup(broker, port);
  mqttManager.connect(clientId);

  if (!WiFi.isConnected()) {
    ledManager.setStatus(LedStatus::WifiError);  // WiFi error
  } else if (!mqttManager.isConnected()) {
    ledManager.setStatus(LedStatus::MqttError); // MQTT error
  } else {
    ledManager.setStatus(LedStatus::Normal); // Normal
  }
}

void AquaponikNode::loop() {
  ledManager.update();
  mqttManager.loop();

  if (millis() - lastSendTime >= sendInterval) {
    lastSendTime = millis();
    String data = sensorManager.toJSON();
    mqttManager.publishSensorData(topic, data);
  }
}
