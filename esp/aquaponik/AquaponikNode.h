#ifndef AQUAPONIK_NODE_H
#define AQUAPONIK_NODE_H

#include "WifiManager.h"
#include "MQTTClientManager.h"
#include "LedStatusManager.h"
#include "SensorManager.h"

/// @class AquaponikNode
/// @brief Class utama yang mengatur lifecycle node Aquaponik (WiFi, MQTT, Sensor).
class AquaponikNode {
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
  const char* clientId = "esp32-Aquaponik";
  const char* topic    = "taniverse/Aquaponik/sensor";
};

#endif
