from flask import Flask, request, jsonify
from lac import read_file

app = Flask(__name__)

@app.route('/api/readfile', methods=["POST"])
def send_file():
    data = read_file(request.data)

    print("SENDING DATA")
    print(data)
    data = jsonify(data)
    return data

@app.route('/api/test', methods=["GET"])
def get_test():
    return "Hello Test"


if __name__ == "__main__":
    app.run()
