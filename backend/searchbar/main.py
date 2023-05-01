from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote
from searchbar.search import search

app = Flask('searchbar')
CORS(app)


@app.route('/suggestions/q=<input>')
def get_suggestions(input):
    return jsonify(search(unquote(input)))      # handles most special characters but fails on / 
    # return("hello world")