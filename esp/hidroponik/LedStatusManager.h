#include <Arduino.h>
#ifndef LED_STATUS_MANAGER_H
#define LED_STATUS_MANAGER_H

/// @class LedStatusManager
/// @brief Mengatur pola blink LED bawaan untuk status operasi.
class LedStatusManager {
public:
  LedStatusManager(uint8_t pin = LED_BUILTIN);

  /// @brief Update LED sesuai waktu dan mode blink saat ini.
  void update();

  /// @brief Ubah mode blink berdasarkan status sistem.
  /// @param blinks Jumlah blink dalam 1 detik (1=normal, 2=wifi error, dst)
  void setBlinkPattern(uint8_t blinks);

private:
  uint8_t ledPin;
  uint8_t blinkCount;
  unsigned long lastBlinkTime = 0;
  unsigned long lastCycleTime = 0;
  uint8_t currentBlink = 0;
  bool ledState = false;
};

#endif
