#include "LedStatusManager.h"

LedStatusManager::LedStatusManager(uint8_t pin)
  : _pin(pin), _onDuration(1000), _offDuration(1000),
    _lastToggle(0), _ledState(false) {
  pinMode(_pin, OUTPUT);
  digitalWrite(_pin, LOW);
}

void LedStatusManager::setStatus(LedStatus status) {
  _onDuration = static_cast<uint8_t>(status) * 1000UL;
  _offDuration = 1000;
  _lastToggle = millis();
  _ledState = false;
  digitalWrite(_pin, LOW);
}

void LedStatusManager::update() {
  unsigned long now = millis();
  if (_ledState && now - _lastToggle >= _onDuration) {
    _ledState = false;
    _lastToggle = now;
    digitalWrite(_pin, LOW);
  }
  else if (!_ledState && now - _lastToggle >= _offDuration) {
    _ledState = true;
    _lastToggle = now;
    digitalWrite(_pin, HIGH);
  }
}
