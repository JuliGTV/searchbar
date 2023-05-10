from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote
from searchbar.search import search
from searchbar.var import *
from searchbar.interface import TableInterface
import json

app = Flask('searchbar')
CORS(app)

interface = TableInterface(project, bt_instance, bt_table, key)

@app.route('/suggestions/q=<input>')
def get_suggestions(input):
    return jsonify(search(unquote(input),interface))      # handles most special characters but fails on / 
    # return("hello world") 

@app.route('/input-suggestion', methods = ['POST'])
def new_suggestion():
    print("messaged received ")
    data = request.get_data()
    print(data)
    newdict = json.loads(data)
    k, url = newdict.popitem()
    interface.new_cell(k, url)
    return jsonify("recieved")
print("sup?")  