![image](https://github.com/user-attachments/assets/bbe61a44-7854-422f-8f30-62193a8198ea)

# LDR程式碼
```cpp
///////////////////////////////
///////Made by EricbobXD///////
///////////////////////////////
// 設定引腳
const int LDR_Pin = A0;   // 光敏電阻的類比輸入引腳
const int Output_Pin = 9; // PWM輸出引腳

// 設定閾值，當光線強度超過此閾值時才會輸出電壓
const int thresholdValue = 500; 

// 儲存感測數值及對應的輸出電壓
int lastSensorValue = 0;
int lastOutputValue = 0;

void setup() {
  // 初始化序列埠，用於顯示數據
  Serial.begin(9600);
  // 設定 PWM 輸出引腳為輸出模式
  pinMode(Output_Pin, OUTPUT);
}

void loop() {
  // 讀取光敏電阻的值（0 - 1023）
  int sensorValue = analogRead(LDR_Pin);
  
  // 打印讀取到的光敏電阻數值，方便觀察
  Serial.print("LDR Value: ");
  Serial.println(sensorValue);

  // 如果光敏電阻的數值超過閾值，才進行輸出電壓的操作
  if (sensorValue >= thresholdValue) {
    // 將光敏電阻的數值映射到 PWM 值 (0-255)
    int outputValue = map(sensorValue, thresholdValue, 1023, 0, 255);
    
    // 設定 PWM 輸出電壓，這會根據光線強度變化
    analogWrite(Output_Pin, outputValue);

    // 保存當下的感測數值和輸出電壓值
    lastSensorValue = sensorValue;
    lastOutputValue = outputValue;

    // 打印保存的感測數值及電壓
    Serial.print("Saved Sensor Value: ");
    Serial.println(lastSensorValue);
    Serial.print("Saved Output Voltage (PWM Value): ");
    Serial.println(lastOutputValue);
  } else {
    // 如果感測數值未達閾值，則停止輸出
    analogWrite(Output_Pin, 0);
    Serial.println("Below threshold, no output voltage.");
  }

  // 每秒更新一次
  delay(1000);
}
```

# [arduino程式碼](https://wokwi.com/projects/408150621395688449)

