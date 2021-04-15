from flask import Flask, request, jsonify
import pickle
import torch 
from torch import nn
import numpy as np
from model import Model
from sentence_transformers import SentenceTransformer


app = Flask(__name__)
device = torch.device('cpu')

@app.route("/")
def hello_world():
    return "5001はsemantic scoring"

@app.route("/cal", methods=['POST']) # 画像とテキストの関連度を計算
def cal():
    model = load_model()
    # 入力をjsonで取得
    input_json = request.get_json()
    # input_json = {'answer': "A train is going.", "img_id": 0}
    # テキストをembeddingに変換
    txt_ebd = embedding(input_json["answer"])

    # 画像のembedding取得
    with open("image.pkl", "rb") as f:
        img_ebd = pickle.load(f)

    # 関連度計算
    pred, score = eval(model, img_ebd[input_json["img_id"]], txt_ebd)
    result = {"semantic_score": format(pred, ".2f")}
    print(result)
    return jsonify(result)


# 学習済みモデルの読み込み
def load_model():
    model = Model()
    model.load_state_dict(torch.load("model/berteach_wn05_0220model_epoch3.pth", map_location=device))
    return model

def embedding(text):
    sbert_model = SentenceTransformer('paraphrase-distilroberta-base-v1')
    txt_ebd = torch.tensor(sbert_model.encode(text))
    return txt_ebd


def eval(model, img_ebd, txt_ebd):
    model.eval()
    with torch.no_grad():
        print(img_ebd)
        pred = model(img_ebd, txt_ebd)
    pred = torch.squeeze(pred)
    m = nn.Sigmoid()
    pred = m(pred)
    pred = pred.detach().numpy().copy()
    
    score = np.where(pred>0, 1, 0)

    return pred*100, score

