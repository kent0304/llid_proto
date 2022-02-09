FROM python:3.7.4

ARG project_directory
WORKDIR $project_directory

RUN pip install -U pip setuptools wheel
RUN pip install flask

# ERRANT
RUN python -m venv errant_env
RUN /bin/bash -c "source errant_env/bin/activate"
RUN pip install errant
RUN python -m spacy download en