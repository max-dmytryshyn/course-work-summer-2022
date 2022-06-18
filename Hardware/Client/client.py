import time

import requests
import json
import serial
import struct


def log_in(username, password):
    credentials = {"username": username, "password": password}
    response = requests.post("http://192.168.0.124:8000/users/login/", json=credentials)

    if response.status_code < 400:
        response_data = json.loads(response.text)
        auth_token = f"Token {response_data['token']}"
        auth_header = {"Authorization": auth_token}
        print(auth_token)
        return auth_token, auth_header
    else:
        exit(1)


def create_temperature_record(temperature, bakery_id, auth_header):
    create_temperature_record_mutation =\
        """
        mutation CreateTemperatureRecord($temperature: Float, $bakeryId: ID) {
          createTemperatureRecord(temperature :$temperature, bakeryId: $bakeryId) {
            id,
            date,
            temperature,
            bakeryId
          }
        }
        """
    temperature_record_input_data = {"temperature": temperature, "bakeryId": bakery_id}
    response = requests.post("http://192.168.0.124:8000/graphql/",
                             json={
                                 "query": create_temperature_record_mutation,
                                 "variables": temperature_record_input_data
                             },
                             headers=auth_header)
    response_data = json.loads(response.text)
    print(response_data)


def create_humidity_record(humidity, bakery_id, auth_header):
    create_humidity_record_mutation =\
        """
        mutation CreateHumidityRecord($humidity: Float, $bakeryId: ID) {
          createHumidityRecord(humidity :$humidity, bakeryId: $bakeryId) {
            id,
            date,
            humidity,
            bakeryId
          }
        }
        """
    temperature_record_input_data = {"humidity": humidity, "bakeryId": bakery_id}
    response = requests.post("http://192.168.0.124:8000/graphql/",
                             json={
                                 "query": create_humidity_record_mutation,
                                 "variables": temperature_record_input_data
                             },
                             headers=auth_header)
    response_data = json.loads(response.text)
    print(response_data)


if __name__ == "__main__":
    super_user_username = "test_user"
    super_user_password = "password123"
    auth_token, auth_header = log_in(super_user_username, super_user_password)
    serial = serial.Serial('COM2', 9600, timeout=5)

    def get_slave_data(slave_number):
        command_byte_string = struct.pack("B", slave_number)
        serial.write(bytes(command_byte_string))
        slave_data_bytes = serial.readline()
        slave_data_string = ""
        slave_data_bytes_counter = 0
        while slave_data_bytes[slave_data_bytes_counter] != 0 \
                and slave_data_bytes_counter < len(slave_data_bytes) - 3:
            slave_data_string += chr(slave_data_bytes[slave_data_bytes_counter])
            slave_data_bytes_counter += 1
        temperature_start_position = slave_data_string.find('T')
        humidity_start_position = slave_data_string.find('H')
        temperature = float(slave_data_string[temperature_start_position + 1: humidity_start_position])
        humidity = int(slave_data_string[humidity_start_position + 1:])
        return {"temperature": temperature, "humidity": humidity}

    while True:
        slave_1_data = get_slave_data(1)
        create_temperature_record(slave_1_data["temperature"], 1, auth_header)
        create_humidity_record(slave_1_data["humidity"], 1, auth_header)

        slave_2_data = get_slave_data(2)
        create_temperature_record(slave_2_data["temperature"], 2, auth_header)
        create_humidity_record(slave_2_data["humidity"], 2, auth_header)

        slave_3_data = get_slave_data(3)
        create_temperature_record(slave_3_data["temperature"], 3, auth_header)
        create_humidity_record(slave_3_data["humidity"], 3, auth_header)

        slave_4_data = get_slave_data(4)
        create_temperature_record(slave_4_data["temperature"], 4, auth_header)
        create_humidity_record(slave_4_data["humidity"], 4, auth_header)
        time.sleep(8)
