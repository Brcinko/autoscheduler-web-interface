"""
    db_connection, author: Lukas Klescinec <lukas.klescinec@gmail.com>
    FIIT Slovak University of Technology 2017
    This module is part of master thesis.
"""

from settings import DB_PORT, DB_ADDRESS
from pymongo import MongoClient
from bson import json_util
import json
import pprint


def connect_to_db():
    client = MongoClient(DB_ADDRESS, DB_PORT)
    db = client.autoscheduler_db
    return db


def get_collection(db, collection_name):
    collection = db[collection_name]
    return collection


def get_documents(collection, query):
    data = collection.find(query)
    # pprint.pprint(collection.find(query))
    documents = list()
    for d in data:
        doc = json.loads(json_util.dumps(d))
        doc['_id'] = str(d['_id'])
        doc['meta']['date'] = str(d['meta']['date'])
        # print str(doc)
        documents.append(doc)
    return documents


def get_max_date_document(collection):
    query = {}
    query['meta.definition'] = {}
    query['meta.definition']['$nin'] = [True]
    pprint.pprint(query)
    document = collection.find(query).sort("meta.date", -1).limit(1)
    for d in document:
        doc = json.loads(json_util.dumps(d))
        doc['_id'] = str(d['_id'])
        doc['meta']['date'] = str(d['meta']['date'])
        return doc
    return document
