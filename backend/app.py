from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests 
import json

import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem.porter import PorterStemmer
nltk.download('punkt')

app = Flask(__name__)
cors = CORS(app)
@app.route("/")
def hello_world():
    return "5000はバックエンド"

@app.route("/judge", methods=["POST"])
def judge():
    # 受け取ったパラメータ整理
    q = request.get_json()
    orig = q['answer']
    key = q['key']
    img_id = q['img_id']

    # key 使われているか確認
    key_judge = check_key(orig, key)

    # gector により result 受け取る
    r = requests.post("http://gector_flask:5002/gector", json=q)
    result = r.json()['result']
    r = r.json()
    
    # semantic により "semantic_score" 取得
    q = {"answer": orig, "img_id": img_id}
    r = requests.post("http://semantic_flask:5001/cal", json=q)
    r = r.json()

    # 返したい情報追加
    r['orig'] = orig
    r['gector_result'] = result
    r['key_judge'] = key_judge

    return r


# key が使われているか確認する関数 ------------------------------
def check_key(sen, key):
    sen = clean(sen)
    tokens = word_tokenize(sen)
    # print(tokens)
    porter = PorterStemmer()
    stem_tokens = [porter.stem(word) for word in tokens]
    # print(stem_tokens)
    for k in key.split():
        if k in tokens or k in stem_tokens:
            continue 
        else:
            return False
    return True


def clean(text):
    text = re.sub(r',', '', text)
    text = re.sub(r'\.', '', text)
    text = re.sub(r'\(.*?\)', '', text)
    return text