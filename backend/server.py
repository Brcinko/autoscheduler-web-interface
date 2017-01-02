"""
    server, author: Lukas Klescinec <lukas.klescinec@gmail.com>
    FIIT Slovak University of Technology 2016
    This module is part of master thesis.
"""

"""import pprint
import db_connection
import settings
from string import replace"""


from flask import Flask, request, jsonify, json, render_template, Response
from flask_cors import CORS, cross_origin

app = Flask(__name__, template_folder='frontend')
cors = CORS(app, resources={r"/*": {"origins": "*",
                                    "methods": " [GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE]",
                                    "headers": "*"}})


@app.route('/info', methods=['GET'])
def info():
    if request.method == 'GET':
        return "200 OK"


if __name__ == '__main__':
    # connect database
    # conn = db_connection.open_connection()
    # print "Database connected."
    # start API server
    app.run(debug=True, port=8080)
