# LLID Feedback v0.1
This repository contains the automatic assessment system for Image Description by Language Learners.


## Overview
We focus on image description and a corresponding assessment system for language learners. To achieve automatic assessment of image description, we construct a novel dataset, the Language Learner Image Description (LLID) dataset, which consists of images, their descriptions, and assessment annotations.
Then, we propose a novel task of automatic error correction for image description, and we develop a baseline model that encodes multimodal information from a learner sentence with an image and accurately decodes a corrected sentence. Our experimental results show that the developed model can revise errors that cannot be revised without an image.


## Usage
The easiest way to use LLID Feedback and its dependencies is using docker.
```
docker-compose build
docker-compose up
```


## Pretrained Model and Image Features
- Download pretrained model in 'llid/model'
（以下のリンク先のllid_dataというフォルダの中身をllid/modelに置く）
https://drive.google.com/drive/folders/1jXtTCGbbnoO8x-uEnwWjQHZe20fuyzjD?usp=sharing
- Download pretrained image features in 'llid/data'
（以下のリンク先のepoch_16.thというファイルをllid/modelに置く）
https://drive.google.com/file/d/1-8zKLeULvVmYLVM2qYqSReGk2dJU6kNq/view?usp=sharing
