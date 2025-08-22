#ifndef WIFI_MANAGER_H
#define WIFI_MANAGER_H

/// @class WiFiManager
/// @brief Menangani koneksi ke banyak jaringan WiFi secara otomatis.
class WiFiManager {
public:
  /// @brief Mencoba koneksi ke SSID dalam daftar, berurutan hingga berhasil.
  void connect();
};

#endif
