from flask import Flask, request
import socket

app = Flask(__name__)

SERVER_IP = '10.247.67.73'  # Replace with the Pi4 IP address
SERVER_PORT = 12345

@app.route('/move', methods=['POST'])
def move_character():
    character_id = request.form['character_id']
    new_coordinates = request.form['coordinates']
    try:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect((SERVER_IP, SERVER_PORT))
        client_socket.sendall(f'moveCharacter:{character_id}:{new_coordinates}'.encode())
        response = client_socket.recv(1024).decode()
        client_socket.close()
        return response
    except Exception as e:
        return str(e)

@app.route('/spawn_enemy', methods=['POST'])
def spawn_enemy():
    enemy_type = request.form['enemy_type']
    coordinates = request.form['coordinates']
    try:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect((SERVER_IP, SERVER_PORT))
        client_socket.sendall(f'spawnEnemy:{enemy_type}:{coordinates}'.encode())
        response = client_socket.recv(1024).decode()
        client_socket.close()
        return response
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Change host to '0.0.0.0' to make the client accessible on the local network