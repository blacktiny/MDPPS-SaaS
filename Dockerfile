FROM node:12.14.1-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y yarn git git-flow
