# Copyright @yuta519
# This is a Dockerfile of OSIETE OSINT backend docker image.

FROM python:3.9-alpine
WORKDIR /usr/src/app
# not allow to write pyc files
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk del build-deps

RUN pip install --upgrade pip \
&& pip install pipenv
COPY ./Pipfile /usr/src/app/Pipfile
RUN pipenv install --skip-lock --system --dev
COPY . /usr/src/app/
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]