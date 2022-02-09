FROM python:3.7.4

ARG project_directory
WORKDIR $project_directory

COPY /requirements.txt $project_directory

RUN pip install -U pip setuptools wheel
RUN pip --no-cache-dir install -r requirements.txt

CMD ["/bin/sh"]