from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.parse import unquote
from searchbar.search import search
from searchbar.interface import TableInterface
import json

app = Flask('searchbar')
CORS(app)

interface = TableInterface('userkwords')

@app.route('/hello')
def hello():
    return 'Hello World!'

@app.route('/get_url/user=<user>/q=<input>')
def get_suggestions(input, user):
    return jsonify(search(unquote(input), user, interface))      # handles most special characters but fails on / 
    # return("hello world") 

@app.route('/new_key', methods = ['POST'])
def new_suggestion():
    print("new key received ")
    data = request.get_data()
    print(data)
    newdict = json.loads(data)
    k, url = newdict['new'].popitem()
    user = newdict['id']
    interface.create_key(user, k, url)     # commented out for testing when db is closed
    return jsonify("recieved")
print("sup?")  

@app.route('/get_user_keys/user=<user>')
def get_user_keys(user):
    userkeys = {}
    userkeys['Personal'] = {'content':interface.get_user_urls(user), 'editable': True}
    userkeys['General'] = {'content':interface.get_user_urls('gen'), 'editable': False}
    owned = interface.get_user_groupsowned(user)
    groups = interface.get_user_groups(user)
    for group in groups:
        userkeys[group] = {'content':interface.get_user_urls(group), 'editable': group in owned}
    return jsonify(userkeys)


@app.route('/join_group', methods = ['POST'])
def join_group():
    print("join group received")
    data = request.get_data()
    print(data) 
    dct = json.loads(data)
    interface.join_group(dct['id'], dct['group'])
    return jsonify("recieved")
    
@app.route('/leave_group', methods = ['POST'])
def leave_group():
    print("leave group received")
    data = request.get_data()
    print(data) 
    dct = json.loads(data)
    interface.leave_group(dct['id'], dct['group'])
    return jsonify("recieved")
    
@app.route('/new_group_key', methods = ['POST'])
def new_group_key():
    print("new group key received")
    data = request.get_data()
    print(data)
    dct = json.loads(data)
    if dct['group'] == 'Personal': interface.create_key(dct['id'], dct['key'], dct['url'])  
    else: interface.create_group_key(dct['id'],dct['group'], dct['key'], dct['url'])
    return jsonify("recieved")

@app.route('/delete_group_key', methods = ['POST'])
def delete_group_key():
    print("delete group key received")
    data = request.get_data()
    print(data)
    dct = json.loads(data)
    if dct['group'] == 'Personal': interface.delete_key(dct['id'], dct['key'])  
    else: interface.delete_group_key(dct['id'], dct['group'], dct['key'])
    return jsonify("recieved")
    
    
@app.route('/create_group', methods = ['POST'])
def create_group():
    print("create group received")
    data = request.get_data()
    print(data)
    dct = json.loads(data)
    success = interface.create_group(dct['id'], dct['group'])
    return jsonify(success)