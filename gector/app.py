from flask import Flask, request, jsonify
import re
import nltk
nltk.download('punkt')

from utils.helpers import read_lines
from gector.gec_model import GecBERTModel

app = Flask(__name__)

# モデルのロード
model = GecBERTModel(vocab_path='data/output_vocabulary',
                     model_paths=['model/roberta_1_gector.th', 'model/xlnet_0_gector.th'],
                     max_len=50, min_len=3,
                     iterations=5,
                     min_error_probability=0.45,
                     lowercase_tokens=0,
                     model_name='roberta',
                     special_tokens_fix=1,
                     log=False,
                     confidence=0.24,
                     is_ensemble=1)

def tokenize(text):
    text_list = []
    for sentence in nltk.sent_tokenize(text.replace('.', '. ')):
        tokenize_sentence = nltk.word_tokenize(sentence)
        punct = [',', '.', "n't", "'s", "!"]
        tokenize_sentence = [token if token in punct else (' ' + token) for token in tokenize_sentence]
        tokenize_sentence = ''.join(tokenize_sentence).strip()
        text_list.append(tokenize_sentence)
    return text_list


@app.route("/")
def hello_world():
    print('hello world')
    return '7000はGECToRのポートです。'

@app.route("/gector", methods=['POST'])
def predict(batch_size=32):
    q = request.get_json() # POSTされたJSONを取得
    # print("-------========")
    # print(q)
    # print(q['answer'])
    # print("-------========")
    input = tokenize(q['answer']) # トークナイズ処理を加え、文で分割したリスト管理
    predictions = []
    cnt_corrections = 0
    batch = []
    for sent in input:
        batch.append(sent.split())
        if len(batch) == batch_size:
            preds, cnt = model.handle_batch(batch)
            predictions.extend(preds)
            cnt_corrections += cnt
            batch = []
    if batch:
        preds, cnt = model.handle_batch(batch)
        predictions.extend(preds)
        cnt_corrections += cnt

    result = " ".join([" ".join(x) for x in predictions])
    return jsonify({"result": result})
    # return json['answer']

#curl -X POST -H "Content-Type: application/json" -d '{"answer": "I went on the park woth my friend."}' localhost:7000/gector
