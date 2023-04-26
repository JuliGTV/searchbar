#!/bin/sh

export FLASK_APP=./searchbar/first.py
pipenv run flask --debug run -h 0.0.0.0