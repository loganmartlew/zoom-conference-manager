# syntax=docker/dockerfile:1
FROM zoom-manager-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder
COPY . .
RUN npx nx build api-server ${BUILD_FLAG}


FROM zoom-manager-base-image:nx-base

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

CMD ["node", "./dist/apps/api-server/main.js"]