from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
import requests

# Initialize Flask app
def create_app():
    """create and configures an instance of a flask app"""
    app = Flask(__name__)

    @app.route('/')
    def root():
        return "App Hollow Home"

    # @app.route('/data', methods=['POST', 'GET'])
    # def responses():
    #     response = requests.get(
    #         'https://raw.githubusercontent.com/labs15-best-places/backend/master/data-seeding/1-cities/data.js')
    #     return str(response.text)

    

    return app

# if __name__ == "__main__":
#     app.run(debug=True)