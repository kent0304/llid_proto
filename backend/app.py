from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests 
import json

app = Flask(__name__)
cors = CORS(app)
@app.route("/")
def hello_world():
    return "5000はバックエンド"

@app.route("/judge", methods=["POST"])
def judge():
    # gector
    q = request.get_json()
    orig = q['answer']
    r = requests.post("http://gector_flask:5002/gector", json=q)
    r = r.json()
    # crt = r.json()['result']
    r['orig'] = orig
    # semantic
    # q = {"orig": orig, "crt": crt}
    # r = requests.post("http://semantic_flask:5001/semantic", json=q)
    # r = r.json()
    # r['cor'] = cor
    return r