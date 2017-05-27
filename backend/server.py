"""
    server, author: Lukas Klescinec <lukas.klescinec@gmail.com>
    FIIT Slovak University of Technology 2017
    This module is part of master thesis.
"""
import db_connection
import pprint
import datetime

from flask import Flask, request, jsonify, json, render_template, Response
from flask_cors import CORS, cross_origin


"""
import settings
from string import replace"""

app = Flask(__name__, template_folder='frontend')
cors = CORS(app, resources={r"/*": {"origins": "*",
                                    "methods": " [GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE]",
                                    "headers": "*"}})
WEIGHTS_DICTIONARY = ['hardware.system_stats.io.used','hardware.memory.used']



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
        pprint.pprint(conf)
        return json.dumps(conf)


@cross_origin()
@app.route('/get_last_conf', methods=['GET'])
def get_last_conf_date():
    if request.method == 'GET':
        collection = db_connection.get_collection(db=db, collection_name="configurations")
        conf = db_connection.get_max_date_document(collection)
        return conf['meta']['date']


@cross_origin()
@app.route('/get_hosts_list', methods=['GET'])
def get_hosts_list():
    if request.method == 'GET':
        collection = db_connection.get_collection(db=db, collection_name="hosts_list")
        hosts = db_connection.get_max_date_document(collection)
        hostsx = list()
        for d in hosts['hosts']:
            hostsx.append(d['host_name'])
    return json.dumps({"hosts": hostsx})


@cross_origin()
@app.route('/get_stats_by_host', methods=['GET'])
def get_stats_by_host():
    if request.method == 'GET':
        collection = db_connection.get_collection(db=db, collection_name="hosts_statistics")
        week = datetime.datetime.utcnow() - datetime.timedelta(days=25)
        query = {}
        query['meta.host_id'] = request.args['host_id']
        query['meta.date'] = {}
        query['meta.date']['$gte'] = week
        stats = db_connection.get_documents(collection, query)
        serialized_stats = serialize_stats(stats)
        pprint.pprint(serialized_stats)
        return json.dumps(serialized_stats)


@cross_origin()
@app.route('/get_general_stats', methods=['GET'])
def get_general_stats():
    if request.method == 'GET':
        collection = db_connection.get_collection(db=db, collection_name="hosts_statistics")
        week = datetime.datetime.utcnow() - datetime.timedelta(days=25)
        query = dict()
        query['meta.date'] = {}
        query['meta.date']['$gte'] = week

        stats = db_connection.get_documents(collection, query)
        serialized_stats = serialize_stats(stats)
        pprint.pprint(serialized_stats)
        return json.dumps(serialized_stats)


def serialize_stats(stats):
    day_stats = list()
    days = list()
    for s in stats:
        days.append(datetime.datetime.strptime(s['meta']['date'][:10], "%Y-%m-%d"))
    days = list(set(days))
    days.sort()
    for day in days:
        day_statsx = dict()
        day_statsx['meta'] = dict()
        day_statsx['meta']['host_id'] = s['meta']['host_id']
        day_statsx['meta']['date'] = str(day)
        day_statsx['stats'] = list()
        for s in stats:

            for p in stats:
                if datetime.datetime.strptime(p['meta']['date'][:10], "%Y-%m-%d") == day:
                    day_statsx['stats'] += p['stats']
        # pprint.pprint(day_statsx)
        day_stats.append(day_statsx)
    response = list()

    for d in day_stats:
        # pprint.pprint(
        #     d['meta']
        # )
        responsex = dict()
        responsex['meta'] = dict()
        responsex['meta']['host_id'] = d['meta']['host_id']
        responsex['meta']['date'] = d['meta']['date']
        responsex['stats'] = []
        for w in WEIGHTS_DICTIONARY:
            stat_record = dict()
            values = list()
            for s in d['stats']:
                if s['stat_name'] == w:
                    stat_record['stat_name'] = s['stat_name']
                    stat_record['unit'] = s['unit']
                    values.append(float(s['value']))
            stat_record['value'] = compute_load(values)
            responsex['stats'].append(stat_record)
        response.append(responsex)
    return response


def compute_load(values):
    average = 0
    if len(values) > 0:
        average = sum(values) / len(values)
    return '%.1f' % round(average, 1)


if __name__ == '__main__':
    # connect and get db
    db = db_connection.connect_to_db()
    print "Database connected."
    # start API server
    app.run(debug=True, port=8080)
