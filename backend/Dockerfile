FROM ubuntu:22.04

ENV NODE_VERSION=20.16.0 \
    USER=deploy\
    USER_HOME=/home/${USER}

WORKDIR /app

ARG POSTGRES_HOST
ARG SERVER_PORT
ARG DATABASE_URL

ENV PGHOST=${POSTGRES_HOST} \
    DATABASE_URL=${DATABASE_URL} \
    PORT=${SERVER_PORT}

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends  \
    ca-certificates  \
    curl  \
    git  \
    wget  \
    unzip \
    postgresql-client

# Install Node.js
ENV PATH=/usr/local/node/bin:$PATH
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    rm -rf /tmp/node-build-master

# Create a non-root user and home directory
RUN groupadd --system --gid 1000 ${USER} && \
    useradd ${USER} --uid 1000 --gid 1000 --create-home --shell /bin/bash

# Copy files and set ownership
COPY --chown=${USER}:${USER} . .
# Expose the port that the application listens on.
EXPOSE ${SERVER_PORT}

# Run the application.
CMD npm run start
