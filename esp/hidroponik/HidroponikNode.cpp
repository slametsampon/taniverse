#include "HidroponikNode.h"

void HidroponikNode::setup() {
  Serial.begin(115200);
  delay(1000);

  wifiManager.connect();

  if (WiFi.status() != WL_CONNECTED) {
    ledManager.setBlinkPattern(2);  // WiFi error
    return;
  }

  mqttManager.setup(broker, port);
  mqttManager.connect(clientId);

  if (!WiFi.isConnected()) {
    ledManager.setBlinkPattern(2);  // WiFi error
  } else if (!mqttManager.isConnected()) {
    ledManager.setBlinkPattern(3);  // MQTT error
  } else {
    ledManager.setBlinkPattern(1);  // Normal
  }
}

void HidroponikNode::loop() {
  ledManager.update();
  mqttManager.loop();

  if (millis() - lastSendTime >= sendInterval) {
    lastSendTime = millis();
    String data = sensorManager.toJSON();
    mqttManager.publishSensorData(topic, data);
  }
}
