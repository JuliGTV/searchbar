from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

suggestions = [
    {'deletable': True, 'content': "https://imgur.com/a/O25jaEb", 'description': "Zebedee"},
    {"deletable": True, "content": "http://www.google.com/search?q=${text}", "description": "Search Google for: ${text}"},
    {"deletable": True, "content": "https://translate.google.co.uk/?sl=auto&tl=en&text=${text}%0A&op=translate", "description" :"translate ${text} to English"}
    ]


@app.route('/suggestions')
def get_suggestions():
    return jsonify(suggestions)
    # return("hello world")