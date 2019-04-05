//
// Copyright 2015 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// FirebaseDemo_ESP8266 is a sample that demo the different functions
// of the FirebaseArduino API.

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <SPI.h>
#include <MFRC522.h>
#define SS_PIN D4
#define RST_PIN D2

// Set these to run example.
#define FIREBASE_HOST "rfid-pay-app.firebaseio.com"
#define FIREBASE_AUTH "n1dB0beJWHlUB4anvEN7yfQ6eyp9sW2q8aNR7TsJ"
#define WIFI_SSID "jeisoncel"
#define WIFI_PASSWORD "jeison95"
MFRC522 mfrc522(SS_PIN, RST_PIN); // Instance of the class
void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  // RFID
  SPI.begin();       // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522
  Serial.println("RFID reading UID");
}

int n = 0;
String uidGetted = "";
String flagPay = "";
String flagRegister = "";
bool flag = false;
String uid = "";

void loop() {


  flagPay = Firebase.getString("flagPay");
  flagRegister = Firebase.getString("flagRegister");

  if (flagPay == "true" ) {
    Serial.println("Se escucha");
    if ( mfrc522.PICC_IsNewCardPresent())
    {
      if ( mfrc522.PICC_ReadCardSerial())
      {
        Serial.print("Tag UID:");
        uid = "";
        for (byte i = 0; i < mfrc522.uid.size; i++) {
          // Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
          // Serial.print(mfrc522.uid.uidByte[i], HEX);
          uid += mfrc522.uid.uidByte[i];
        }
        Serial.println();
        Serial.println("PAGO");
        Serial.println(uid);
        Serial.println();
        mfrc522.PICC_HaltA();
        Firebase.setString("uidPay", uid);
      }
    }
  } else if (flagRegister == "true") {

    Serial.println("Se escucha");
    if ( mfrc522.PICC_IsNewCardPresent())
    {
      if ( mfrc522.PICC_ReadCardSerial())
      {
        Serial.print("Tag UID:");
        uid = "";
        for (byte i = 0; i < mfrc522.uid.size; i++) {
          // Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
          // Serial.print(mfrc522.uid.uidByte[i], HEX);
          uid += mfrc522.uid.uidByte[i];
        }
        Serial.println();
        Serial.println("REGISTRO");
        Serial.println(uid);
        Serial.println();
        mfrc522.PICC_HaltA();
        Firebase.setString("uidRegister", uid);
      }
    } else {
      Serial.println("Down");
    }
  }


  /*
    // set value
    Firebase.setFloat("number", 42.0);
    // handle error
    if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());
      return;
    }
    delay(1000);

    // update value
    Firebase.setFloat("number", 43.0);
    // handle error
    if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());
      return;
    }
    delay(1000);

    // get value
    Serial.print("number: ");
    Serial.println(Firebase.getFloat("number"));
    delay(1000);

    // remove value
    Firebase.remove("number");
    delay(1000);

    // set string value
    Firebase.setString("message", "hello world");
    // handle error
    if (Firebase.failed()) {
      Serial.print("setting /message failed:");
      Serial.println(Firebase.error());
      return;
    }
    delay(1000);

    // set bool value
    Firebase.setBool("truth", false);
    // handle error
    if (Firebase.failed()) {
      Serial.print("setting /truth failed:");
      Serial.println(Firebase.error());
      return;
    }
    delay(1000);

    // append a new value to /logs
    String name = Firebase.pushInt("logs", n++);
    // handle error
    if (Firebase.failed()) {
      Serial.print("pushing /logs failed:");
      Serial.println(Firebase.error());
      return;
    }
    Serial.print("pushed: /logs/");
    Serial.println(name);
    delay(1000);
  */
}
