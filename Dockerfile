FROM ghcr.io/linuxserver/baseimage-alpine:3.13

LABEL maintainer="aptalca"
LABEL org.opencontainers.image.source=https://github.com/linuxserver/heimdalljs

# environment settings
ENV \
  HOME="/app/heimdall" \
  NODE_ENV="production"

COPY . /app/heimdall

RUN \
  echo "**** install build packages ****" && \
  apk add --no-cache --virtual=build-dependencies \
    curl \
    g++ \
    make \
    python2 && \
  echo "**** install runtime packages ****" && \
  apk add --no-cache \
    nodejs \
    npm && \
  echo "**** install heimdall ****" && \
  cd /app/heimdall && \
  NODE_ENV="development" npm install && \
  cp .env.example .env && \
  npm run build && \
  echo "**** cleanup ****" && \
  npm prune --production && \
  apk del --purge \
    build-dependencies && \
  rm -rf \
    /root/.cache \
    /tmp/*

# add local files
COPY root/ /