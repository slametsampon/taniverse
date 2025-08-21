#ifndef SENSOR_MANAGER_H
#define SENSOR_MANAGER_H

#include <Arduino.h>

/// @class SensorManager
/// @brief Menyediakan pembacaan sensor nyata atau simulasi (random).
class SensorManager {
public:
  /// @brief Buat instance SensorManager
  /// @param simulationMode jika true maka data acak, jika false baca sensor nyata
  SensorManager(bool simulationMode = true);

  float readEC();
  float readPH();
  float readSuhu();
  int   readTinggi();

  /// @brief Menggabungkan pembacaan sensor jadi JSON string
  String toJSON();

private:
  bool simMode;

  // Fungsi pembacaan sensor nyata
  float readECFromSensor();
  float readPHFromSensor();
  float readSuhuFromSensor();
  int   readTinggiFromSensor();
};

#endif
