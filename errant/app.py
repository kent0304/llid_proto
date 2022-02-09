import os
from flask import Flask, request
import errant

app = Flask(__name__)

@app.route("/")
def hello_world():
    return '5002はERRANTのポートです。'

@app.route('/errant', methods=['POST'])
def errant_check():
    q = request.get_json()
    # orig = request.form['orig']
    # cor = request.form['cor']
    orig = q['orig']
    cor = q['cor']
    orig_list = orig.strip().replace(".","").split()
    cor_list = cor.strip().replace(".","").split()
    annotator = errant.load('en')
    edits = err_type(orig, cor, annotator)
    output = {}
    orig_highlights = []
    cor_highlights = []
    hightlights = {}
    for i, e in enumerate(edits):
        output["err{}".format(i)] = {}
        output["err{}".format(i)]["o_start"] = e.o_start
        output["err{}".format(i)]["o_end"] = e.o_end
        output["err{}".format(i)]["c_start"] = e.c_start
        output["err{}".format(i)]["c_end"] = e.c_end
        output["err{}".format(i)]["c_str"] = e.c_str
        output["err{}".format(i)]["type"] = e.type
        orig_highlights.append([e.o_start,e.o_end])
        cor_highlights.append([e.c_start,e.c_end])
    hightlights["orig_highlights"] = arrange_idx(orig_highlights)
    hightlights["cor_highlights"] = arrange_idx(cor_highlights)
    print("hightlights", hightlights)

    return hightlights

def err_type(orig, cor, annotator):
    orig = annotator.parse(orig)
    cor = annotator.parse(cor)
    edits = annotator.annotate(orig, cor)
    return edits

def arrange_idx(highlights):
    output = []
    for l in highlights:
        l_head = int(l[0])
        l_tail = int(l[1])
        if l_head > l_tail:
            output += [i for i in range(l_head, l_tail)]
        else:
            output.append(l_head)
    return output


# curl -X POST -H "Content-Type: application/json" -d '{"orig": "a tennis racket is black clour on the bench.", "cor": "a black tennis racket is by the bench."}' localhost:5002/errant
