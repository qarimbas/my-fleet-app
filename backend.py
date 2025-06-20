from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/metar/<station>', methods=['GET'])
def get_metar(station):
    try:
        url = f"https://tgftp.nws.noaa.gov/data/observations/metar/stations/{station}.TXT"
        response = requests.get(url)
        if response.status_code != 200:
            return jsonify({"error": f"Failed to fetch METAR data: {response.status_code}"}), response.status_code
        return jsonify({"metar": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)