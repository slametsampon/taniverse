#ifndef MQTT_CLIENT_MANAGER_H
#define MQTT_CLIENT_MANAGER_H

#include <WiFi.h>
#include <PubSubClient.h>

/// @class MQTTClientManager
/// @brief Menangani koneksi ke broker MQTT dan publikasi data sensor.
class MQTTClientManager {
public:
  MQTTClientManager();

  /// @brief Setup alamat dan port broker MQTT.
  void setup(const char* broker, int port);

  /// @brief Koneksikan client ke broker.
  void connect(const char* clientId);

  /// @brief Dipanggil terus-menerus di loop() untuk menjaga koneksi.
  void loop();

  /// @brief Publikasi data sensor dalam bentuk JSON ke topik MQTT.
  void publishSensorData(const char* topic, const String& payload);

  bool isConnected();

private:
  WiFiClient wifiClient;
  PubSubClient mqttClient;
};

#endif
