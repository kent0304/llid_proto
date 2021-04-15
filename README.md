# SPIDY🕷 v0.1
This repository contains the automatic scoring system for picture description (SPIDY)


## Overview
In language learning, training output skill such as speaking and writing is vital in order to retain the learned knowledge. However, scoring descriptive questions by humans would be costly,  and this is why automatic scoring systems attract attention. In this research, we try to realize an automatic scoring system for picture description. Concretely, (i) we first analyze the trends of errors that English learners would make, (ii) then create a pseudo dataset by artificially mimicking the errors, and (iii) finally consider a model that judges whether a given pair of a picture and a sentence is valid or not. In experiments, we trained the model with the created pseudo data and evaluate it with the answers provided by actual learners.

## How to Score
- Whether the key is used
- Semantic scoring ([GitHub](https://github.com/kent0304/semantic-scoring))
- Grammatical error correction ([Grammarly GitHub](https://github.com/grammarly/gector))

## Usage
The easiest way to use SPIDY and its dependencies is using docker.
```
docker-compose build
docker-compose up
```

<img width="1436" alt="Screen Shot 2021-04-14 at 17 38 36" src="https://user-images.githubusercontent.com/29160373/114680613-54274d00-9d48-11eb-8511-7e001f0d0be1.png">
<img width="1434" alt="Screen Shot 2021-04-14 at 17 38 50" src="https://user-images.githubusercontent.com/29160373/114680636-59849780-9d48-11eb-8701-c1a8bfc64bd2.png">
