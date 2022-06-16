FROM node:16.10-alpine
WORKDIR /usr/src/frontend
COPY . .
RUN apk update && apk add bash
RUN cd bakeries_conditions_monitoring && npm ci