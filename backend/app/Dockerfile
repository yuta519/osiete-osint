# Copyright @yuta519
# This is a Dockerfile of OSIETE OSINT backend docker image.

FROM python:3.9-alpine
WORKDIR /usr/src/app
# not allow to write pyc files
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip \
&& pip install pipenv
COPY ./Pipfile /usr/src/app/Pipfile
RUN pipenv install --skip-lock --system --dev
COPY . /usr/src/app/