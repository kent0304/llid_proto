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
    img_id = q['img_id']
    r = requests.post("http://gector_flask:5002/gector", json=q)
    result = r.json()['result']
    r = r.json()
    
    r['orig'] = orig
    # semantic
    q = {"answer": orig, "img_id": img_id}
    r = requests.post("http://semantic_flask:5001/cal", json=q)
    r = r.json()
    r['result'] = result
    return r