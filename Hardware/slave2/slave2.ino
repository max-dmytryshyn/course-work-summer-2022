#include "Wire.h"
#define WRITE_MODE HIGH
#define READ_MODE LOW
#define MODE_PIN 2

const byte ADRESS = 0xA2;

byte bcdToDec(byte value)
{
  return (value >> 4) * 10 + (value & 0x0F);
}

String getData() {
  Wire.beginTransmission(0x68);
  Wire.write(0);
  Wire.endTransmission();
  Wire.requestFrom(0x68, 7);
  return "T-15.5H100";
}

void sendMessage() {
  byte message[11];
  getData().getBytes(message, 11);
  digitalWrite(MODE_PIN, WRITE_MODE);
  Serial.write(message, 11);
  delay(11);
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
