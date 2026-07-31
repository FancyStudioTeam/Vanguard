FROM node:24-slim

RUN corepack enable pnpm

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json turbo.json ./

COPY apps/vanguard-dashboard apps/vanguard-dashboard

RUN pnpm install
RUN pnpm run build

WORKDIR /main/apps/vanguard-api

ENV PORT=3101

EXPOSE 3101

CMD ["pnpm", "run", "preview"]
