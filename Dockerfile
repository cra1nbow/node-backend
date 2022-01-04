FROM node:16-alpine AS deps
WORKDIR /app
ADD ./package.json ./yarn.lock ./
RUN \
  apk update && \
  apk add --no-cache \
    make \
    g++ \
    python3 && \
  yarn install --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /app
ADD . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD [ "node", "/app/dist/index.js" ]
