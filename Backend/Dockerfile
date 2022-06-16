FROM python:3.8.5-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/backend
COPY . .
RUN pip install -r requirements.txt
WORKDIR /usr/local/lib/python3.8/site-packages/graphene_django/utils
RUN sed -i "s|force_text|force_str|g" utils.py
WORKDIR /usr/src/backend