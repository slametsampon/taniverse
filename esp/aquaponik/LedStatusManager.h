// c:\Users\sam294\Documents\Projects\Agro\taniverse\esp\hidroponik\LedStatusManager.h

#ifndef LED_STATUS_MANAGER_H
#define LED_STATUS_MANAGER_H

#include <Arduino.h>

/// @brief Status sistem untuk indikator LED
enum class LedStatus : uint8_t {
  Normal = 1,       // 1 detik nyala
  WifiError = 2,    // 2 detik nyala
  MqttError = 3,    // 3 detik nyala
  SensorError = 4   // dst...
};

class LedStatusManager {
public:
  explicit LedStatusManager(uint8_t pin = LED_BUILTIN);
  void setStatus(LedStatus status);
  void update();

private:
  uint8_t _pin;
  uint32_t _onDuration;
  uint32_t _offDuration;
  unsigned long _lastToggle;
  bool _ledState;
};

#endif
