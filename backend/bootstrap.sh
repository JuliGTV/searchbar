#!/bin/sh

export FLASK_APP=./searchbar/main.py
export AWS_DEFAULT_REGION=eu-west-2
export AWS_DEFAULT_OUTPUT=json
export AWS_ACCESS_KEY_ID=$id 
export AWS_SECRET_ACCESS_KEY=$secret_key
pipenv run flask --debug run -h 0.0.0.0 -p 8080

# if file not found check line endings are in LF and not CRLF