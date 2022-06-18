#include "Wire.h"
#include "SHT21.h"
#define WRITE_MODE HIGH
#define READ_MODE LOW
#define MODE_PIN 2

const byte ADRESS = 0xA3;

SHT21 sht;

String getData() {
  float temperature = sht.getTemperature();
  sht.reset();
  unsigned int humidity = sht.getHumidity();
  sht.reset();
  String data = "T";
  data += temperature;
  data += "H";
  data += humidity;
  return data;
}

void sendMessage() {
  byte message[11];
  getData().getBytes(message, 11);
  digitalWrite(MODE_PIN, WRITE_MODE);
  Serial.write(message, 11);
  delay(20);
  digitalWrite(MODE_PIN, READ_MODE);
}

void setup() { 
  Wire.begin();
  Serial.begin(9600);
  pinMode(MODE_PIN, OUTPUT);
  digitalWrite(MODE_PIN, READ_MODE); 
}

void loop() {
   if (Serial.available()) {
    byte receiverAddress = (byte)Serial.read();
    if (receiverAddress == ADRESS) {
      delay(10);
      sendMessage();
    }
  }
}
