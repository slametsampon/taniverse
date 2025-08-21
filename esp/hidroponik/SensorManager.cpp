#include "SensorManager.h"

float SensorManager::readEC()     { return 950.0 + random(-10, 10); }
float SensorManager::readPH()     { return 6.2 + random(-5, 5) / 10.0; }
float SensorManager::readSuhu()   { return 25.0 + random(-2, 2); }
int   SensorManager::readTinggi() { return 75 + random(-5, 5); }

String SensorManager::toJSON() {
  String json = "{";
  json += "\"ec\":" + String(readEC(), 1) + ",";
  json += "\"ph\":" + String(readPH(), 1) + ",";
  json += "\"suhu\":" + String(readSuhu(), 1) + ",";
  json += "\"tinggi\":" + String(readTinggi());
  json += "}";
  return json;
}
