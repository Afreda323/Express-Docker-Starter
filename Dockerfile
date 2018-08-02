FROM node:carbon-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install --quiet \
    && apk del build-dependencies

COPY . .