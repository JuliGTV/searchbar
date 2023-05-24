from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote
from searchbar.search import search
from searchbar.interface import TableInterface
import json

app = Flask('searchbar')
CORS(app)

interface = TableInterface('userkwords')


@app.route('/get_url/user=<user>/q=<input>')
def get_suggestions(input, user):
    return jsonify(search(unquote(input), user, interface))      # handles most special characters but fails on / 
    # return("hello world") 

@app.route('/new_key', methods = ['POST'])
def new_suggestion():
    print("messaged received ")
    data = request.get_data()
    print(data)
    newdict = json.loads(data)
    k, url = newdict['new'].popitem()
    user = newdict['id']
    interface.create_item(user, k, url)     # commented out for testing when db is closed
    return jsonify("recieved")
print("sup?")  

@app.route('/get_user_keys/user=<user>')
def get_user_keys(user):
    userkeys = {}
    userkeys['Personal Keys'] = {'content':interface.get_user_urls(user), 'editable': True}
    userkeys['General Keys'] = {'content':interface.get_user_urls('gen'), 'editable': False}
    owned = interface.get_user_groupsowned(user)
    groups = interface.get_user_groups(user)
    for group in groups:
        userkeys[group + ' Keys'] = {'content':interface.get_user_urls(group), 'editable': group in owned}
    return jsonify(userkeys)