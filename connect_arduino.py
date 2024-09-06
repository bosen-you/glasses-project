import serial
import time

port = "COM3" # arduino port
begin = 112500 #Serial.begin(112500)
timeout = 1 # set time out
record_date = []

#arduino初始化
ser = serial.Serial(port, begin, timeout=timeout)

def read_data():
    try:
        # try to read date transmitted Arduino
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()  # read and decode date
            return int(line)
    except ValueError: # if date can be converted to integer
        return None

def convert_date(sensor_value):
    lux = (sensor_value / 1023) * 1000 #change to lux

def record_brightness():
    sensor_value = read_data()
    lux = convert_date(sensor_value)
    record_date.append(lux)
    print(analyze_date())
    time.sleep(30)

def analyze_date():
    average = sum(record_date) / len(record_date)
    max = max(record_date)
    return average , max 

while True:
    record_brightness()
    time.sleep(1)
