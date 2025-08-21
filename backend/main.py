from flask import Flask, request, jsonify
from flask_cors import CORS

CITIES = [
    {"name": "Břeclav"},
    {"name": "Hodonín"},
    {"name": "Brno"},
    {"name": "Praha"},
]

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return jsonify({"response": "Hello World"})


@app.route("/cities", methods=["GET", "POST", "DELETE"])
def cities():
    if request.method == "GET":
        data = CITIES
        return jsonify({"cities": data})

    if request.method == "POST":
        data = request.get_json()
        if data in CITIES:
            return "city already exists", 400
        CITIES.append(data)
        return jsonify({"response": "city was added"})

    if request.method == "DELETE":
        data = request.get_json()
        if data not in CITIES:
            return "city does not exist", 400
        CITIES.remove(data)
        return jsonify({"response": "city was deleted"})


if __name__ == "__main__":
    app.run(debug=True)
