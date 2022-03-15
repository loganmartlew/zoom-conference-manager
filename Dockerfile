# syntax=docker/dockerfile:1
FROM node:16.14.0-alpine AS builder

ARG NODE_ENV
ARG BUILD_FLAG

RUN apk update
RUN apk add git
RUN npm i -g nx

WORKDIR /app/builder
COPY . .
RUN npm i