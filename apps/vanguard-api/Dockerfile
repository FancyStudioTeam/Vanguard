FROM node:24-slim

RUN corepack enable pnpm

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json turbo.json ./

COPY apps/vanguard-api apps/vanguard-api
COPY packages/prisma packages/prisma

RUN pnpm install
RUN pnpm run turbo:build

WORKDIR /main/apps/vanguard-api

ENV HOST=0.0.0.0
ENV PORT=3001

ENV NODE_ENV=production

EXPOSE 3001

CMD ["pnpm", "run", "nest:start"]
