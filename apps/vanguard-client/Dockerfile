FROM node:24-slim

RUN corepack enable pnpm

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json turbo.json ./

COPY apps/vanguard-client apps/vanguard-client

COPY packages/discord-jsx packages/discord-jsx
COPY packages/prisma packages/prisma

RUN pnpm install
RUN pnpm run turbo:build

WORKDIR /main/apps/vanguard-client

ENV NODE_ENV=production

CMD ["pnpm", "run", "vanguard:start"]
