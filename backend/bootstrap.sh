#!/bin/sh

export FLASK_APP=./searchbar/main.py
pipenv run flask --debug run -h 0.0.0.0 -p 8080

# if file not found check line endings are in LF and not CRLF