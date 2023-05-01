#!/bin/sh

export FLASK_APP=./searchbar/main.py
pipenv run flask --debug run -h 0.0.0.0