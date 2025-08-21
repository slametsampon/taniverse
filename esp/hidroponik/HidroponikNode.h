#ifndef HIDROPONIK_NODE_H
#define HIDROPONIK_NODE_H

#include "WiFiManager.h"
#include "MQTTClientManager.h"
#include "SensorManager.h"
#include "LedStatusManager.h"

/// @class HidroponikNode
/// @brief Class utama yang mengatur lifecycle node hidroponik (WiFi, MQTT, Sensor).
class HidroponikNode {
public:
  /// @brief Inisialisasi WiFi, MQTT, dll.
  void setup();

  /// @brief Loop utama untuk mengirim data berkala.
  void loop();

private:
  WiFiManager wifiManager;
  MQTTClientManager mqttManager;
  SensorManager sensorManager = SensorManager(true); // true = simMode
  LedStatusManager ledManager;

  unsigned long lastSendTime = 0;
  const unsigned long sendInterval = 5000;

  const char* broker   = "192.168.0.10";
  const int   port     = 1883;
  const char* clientId = "esp32-hidroponik";
  const char* topic    = "taniverse/hidroponik/sensor";
};

#endif
