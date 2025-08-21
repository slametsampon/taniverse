#ifndef SENSOR_MANAGER_H
#define SENSOR_MANAGER_H

#include <Arduino.h>

/// @class SensorManager
/// @brief Menyediakan pembacaan sensor dan konversi ke JSON.
class SensorManager {
public:
  float readEC();
  float readPH();
  float readSuhu();
  int   readTinggi();

  /// @brief Menggabungkan semua pembacaan menjadi string JSON.
  String toJSON();
};

#endif
