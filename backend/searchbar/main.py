from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote
from searchbar.search import search
from searchbar.interface import TableInterface
import json

app = Flask('searchbar')
CORS(app)

interface = TableInterface('userkeywords')

@app.route('/suggestions/<user>/q=<input>')
def get_suggestions(input, user):
    return jsonify(search(unquote(input), user, interface))      # handles most special characters but fails on / 
    # return("hello world") 

@app.route('/input-suggestion', methods = ['POST'])
def new_suggestion():
    print("messaged received ")
    data = request.get_data()
    print(data)
    newdict = json.loads(data)
    k, url = newdict['new'].popitem()
    user = newdict['id']
    interface.new_item(user, k, url)     # commented out for testing when db is closed
    return jsonify("recieved")
print("sup?")  