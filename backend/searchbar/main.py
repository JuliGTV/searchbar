from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote
from searchbar.search import search
from searchbar.var import *
from searchbar.interface import TableInterface

app = Flask('searchbar')
CORS(app)

interface = TableInterface(project, bt_instance, bt_table, key)

@app.route('/suggestions/q=<input>')
def get_suggestions(input):
    return jsonify(search(unquote(input),interface))      # handles most special characters but fails on / 
    # return("hello world") 