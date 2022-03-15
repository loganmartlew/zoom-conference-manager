# syntax=docker/dockerfile:1
FROM node:16.14.0-alpine AS builder

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder
COPY . .
RUN npm i