from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests 
import json

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def hello_world():
    return "5000はバックエンド"