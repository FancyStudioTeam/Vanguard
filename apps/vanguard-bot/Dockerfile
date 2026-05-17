FROM node:24-slim

RUN corepack enable pnpm

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json turbo.json ./

COPY apps/vanguard-bot apps/vanguard-bot

COPY packages/discord-config packages/discord-config
COPY packages/discord-handlers packages/discord-handlers
COPY packages/discord-jsx packages/discord-jsx

COPY packages/logger packages/logger
COPY packages/prisma packages/prisma

RUN pnpm install
RUN pnpm run turbo:build

WORKDIR /main/apps/vanguard-bot

ENV NODE_ENV=production

CMD ["pnpm", "run", "vanguard:start"]
