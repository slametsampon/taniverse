#include "WiFiManager.h"
#include <WiFi.h>

const char* ssidList[] = {
  "samfamily",
  "PON OFFICE",
  "HotspotHP"
};

const char* passList[] = {
  "basmalah",
  "welcometopon",
  "password3"
};

const int wifiCount = sizeof(ssidList) / sizeof(ssidList[0]);

void WiFiManager::connect() {
  Serial.println("🔌 Mencoba koneksi ke beberapa WiFi...");

  for (int i = 0; i < wifiCount; i++) {
    Serial.printf("🌐 Mencoba konek ke: %s\n", ssidList[i]);
    WiFi.begin(ssidList[i], passList[i]);

    unsigned long startTime = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startTime < 7000) {
      delay(500);
      Serial.print(".");
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\n✅ Tersambung!");
      Serial.print("📶 SSID: ");
      Serial.println(WiFi.SSID());
      Serial.print("💻 IP Address: ");
      Serial.println(WiFi.localIP());
      return;
    }

    Serial.println("\n❌ Gagal, mencoba SSID berikutnya...");
  }

  Serial.println("🚫 Tidak ada WiFi yang tersambung.");
}
