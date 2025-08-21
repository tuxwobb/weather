from flask import Flask, request, jsonify
from flask_cors import CORS

CITIES = [
    {"name": "břeclav"},
    {"name": "hodonín"},
    {"name": "brno"},
    {"name": "praha"},
]

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return jsonify({"response": "Weather API"})


@app.route("/cities", methods=["GET", "POST", "DELETE"])
def cities():
    if request.method == "GET":
        data = CITIES
        return jsonify({"cities": data})

    if request.method == "POST":
        data = request.get_json()
        data["name"] = str(data["name"]).lower()
        if data in CITIES:
            return "city already exists", 400
        CITIES.append(data)
        return jsonify({"response": "city was added"})

    if request.method == "DELETE":
        data = request.get_json()
        data["name"] = str(data["name"]).lower()
        if data not in CITIES:
            return "city does not exist", 400
        CITIES.remove(data)
        return jsonify({"response": "city was deleted"})


if __name__ == "__main__":
    app.run(debug=True)
