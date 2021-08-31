# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install pm2 -g
RUN npm install
EXPOSE 3000