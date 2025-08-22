#include "SensorManager.h"

SensorManager::SensorManager(bool simulationMode) {
  simMode = simulationMode;
}

float SensorManager::readEC() {
  return simMode ? 950.0 + random(-10, 10) : readECFromSensor();
}

float SensorManager::readPH() {
  return simMode ? 6.2 + random(-5, 5) / 10.0 : readPHFromSensor();
}

float SensorManager::readSuhu() {
  return simMode ? 25.0 + random(-2, 2) : readSuhuFromSensor();
}

int SensorManager::readTinggi() {
  return simMode ? 75 + random(-5, 5) : readTinggiFromSensor();
}

String SensorManager::toJSON() {
  String json = "{";
  json += "\"ec\":" + String(readEC(), 1) + ",";
  json += "\"ph\":" + String(readPH(), 1) + ",";
  json += "\"suhu\":" + String(readSuhu(), 1) + ",";
  json += "\"tinggi\":" + String(readTinggi());
  json += "}";
  return json;
}

// ========== Sensor nyata (dummy dulu, bisa diisi nanti) ==========

float SensorManager::readECFromSensor() {
  // TODO: implementasi sensor EC asli
  return 960.0;
}

float SensorManager::readPHFromSensor() {
  // TODO: implementasi sensor pH asli
  return 6.1;
}

float SensorManager::readSuhuFromSensor() {
  // TODO: DS18B20, DHT, atau sensor suhu lain
  return 24.5;
}

int SensorManager::readTinggiFromSensor() {
  // TODO: sensor ultrasonik / water level
  return 80;
}
