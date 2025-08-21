#include "LedStatusManager.h"
#include <Arduino.h>

LedStatusManager::LedStatusManager(uint8_t pin) : ledPin(pin), blinkCount(1) {
  pinMode(ledPin, OUTPUT);
}

void LedStatusManager::setBlinkPattern(uint8_t blinks) {
  blinkCount = blinks;
  currentBlink = 0;
  lastCycleTime = millis();
}

void LedStatusManager::update() {
  unsigned long now = millis();

  // Satu siklus 1 detik
  if (now - lastCycleTime >= 1000) {
    lastCycleTime = now;
    currentBlink = 0;
    digitalWrite(ledPin, LOW);
    ledState = false;
  }

  // Kendali blinking: blinkCount kali selama 1 detik
  if (currentBlink < blinkCount) {
    if (now - lastBlinkTime >= 150) { // interval antar-blink
      lastBlinkTime = now;
      ledState = !ledState;
      digitalWrite(ledPin, ledState);
      if (!ledState) currentBlink++;
    }
  }
}
