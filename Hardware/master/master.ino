#define MODE_PIN 20
#define WRITE_MODE HIGH
#define READ_MODE LOW


const byte SLAVE1ADRESS = 0xA1;
const byte SLAVE2ADRESS = 0xA2;

void sendMessageRequest(byte recevierId) {
 digitalWrite(MODE_PIN, WRITE_MODE); 
  Serial1.write(recevierId);
  delay(10);
  digitalWrite(MODE_PIN, READ_MODE); 
}

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  pinMode(MODE_PIN, OUTPUT);
  digitalWrite(MODE_PIN, READ_MODE); 
  delay(10);
}

void loop() {
  if (Serial.available()) {
    byte serialRequestInfo = Serial.read();
    if (serialRequestInfo == 1) {
      sendMessageRequest(SLAVE1ADRESS);
      delay(30);
      byte data[11];
      Serial1.readBytes(data, 11);
      Serial.write(data, 11);
      Serial.println();
    }
    
    if (serialRequestInfo == 2) {
      sendMessageRequest(SLAVE2ADRESS);
      delay(30);
      byte data[11];
      Serial1.readBytes(data, 11);
      Serial.write(data, 11);
      Serial.println();
    }
  }
}
