"""
    server, author: Lukas Klescinec <lukas.klescinec@gmail.com>
    FIIT Slovak University of Technology 2017
    This module is part of master thesis.
"""
import db_connection
import pprint

from flask import Flask, request, jsonify, json, render_template, Response
from flask_cors import CORS, cross_origin


"""
import settings
from string import replace"""

app = Flask(__name__, template_folder='frontend')
cors = CORS(app, resources={r"/*": {"origins": "*",
                                    "methods": " [GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE]",
                                    "headers": "*"}})


@app.route('/info', methods=['GET'])
def info():
    if request.method == 'GET':
        return "200 OK"


@cross_origin()
@app.route('/get_conf', methods=['GET'])
def get_conf():
    if request.method == 'GET':
        collection = db_connection.get_collection(db=db, collection_name="configurations")
        conf = db_connection.get_max_date_document(collection)
        return json.dumps(conf)


@cross_origin()
@app.route('/get_stats', methods=['GET'])
def get_stats():
    if request.method == 'GET':
        return "200 OK"


if __name__ == '__main__':
    # connect and get db
    db = db_connection.connect_to_db()
    # print "Database connected."
    # start API server
    app.run(debug=True, port=8080)
