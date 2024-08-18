# Stage 1: Build the application
FROM node:20.16.0-alpine AS builder

WORKDIR /builder

RUN apk --update --no-cache add curl g++ make py3-pip bash

SHELL ["/bin/bash", "-c"]

COPY package.json ./
RUN corepack enable && \
  corepack prepare pnpm@latest --activate && \
  pnpm install --silent && \
  if [ -d "/root/.local/share/pnpm" ]; then rm -rf /root/.local/share/pnpm; fi  # Check and remove pnpm cache if it exists

COPY ./src ./src
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./


RUN pnpm run build

# Stage 2: Create the final production image
FROM node:20.16.0-alpine AS birdies-node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /moviesplus

COPY --from=builder /builder/package.json ./
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/node_modules ./node_modules
COPY ./production-start.sh ./

RUN apk --update --no-cache add curl

EXPOSE 3000

# Specify the command to run the application
CMD ["/bin/sh", "./production-start.sh"]