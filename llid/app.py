import pickle
import torch
import torch.nn as nn
import numpy as np
from model import Model
from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "5001は誤り訂正API"

@app.route("/correct", methods=['POST']) # 訂正文取得
def correct():
    # 入力をjsonで取得
    input_json = request.get_json()
    # input_json = {'id': "510", "composition": ""bard is looking apple.""}
    id = input_json["id"]
    orig = input_json["composition"]
    composition = [input_json["composition"].lower()]
    

    # id = '510'
    # composition = ["bard is looking apple."]


    # correct = Correct()
    model = Model()
    # Load model
    path = 'model/epoch16'
    print("Load model from %s" % path)
    state_dict = torch.load("%s.pth" % path, map_location=torch.device('cpu'))
    model.load_state_dict(state_dict)
    model.eval()

    # 510 -> bird
    # 197 -> racket
    # 356 -> backpack
    # 262 -> bench

    # データの読み込み
    with open("data/%s_feats.pickle" % id, "rb") as f:
        feats = pickle.load(f)
    with open("data/%s_boxes.pickle" % id, "rb") as f:
        boxes = pickle.load(f)
    feats = feats.unsqueeze(0).to(torch.device('cpu'))
    boxes = boxes.unsqueeze(0).to(torch.device('cpu'))

    sampled_ids = model.sample(feats, boxes, composition)
    sampled_ids = torch.tensor(sampled_ids)
    sentence = model.tokenizer.decode(sampled_ids)
    sentence_list = sentence.split(' ')
    if "[SEP]" in sentence_list:
        sep_idx = sentence_list.index("[SEP]")
        sentence_list = sentence_list[:sep_idx]
        sentence = " ".join(sentence_list)

    sentence = sentence.replace("[SEP].", "")
    sentence = sentence.replace("[SEP],", "")
    sentence = sentence.replace("[SEP]s", "")
    sentence = sentence.replace(" - ", "-")
    sentence = sentence.capitalize().strip()
    print("訂正結果",sentence)

    return jsonify({"result": sentence, "orig": orig})
   




# curl -X POST -H "Content-Type: application/json" -d '{"id": "510", "composition": "bard is looking apple."}' localhost:5001/correct
