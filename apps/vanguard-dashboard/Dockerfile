FROM node:24-slim

RUN corepack enable pnpm

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-dashboard apps/vanguard-dashboard

RUN pnpm install

WORKDIR /main/apps/vanguard-dashboard

RUN pnpm run router:build

ENV HOST=0.0.0.0
ENV PORT=3101

ENV NODE_ENV=production

EXPOSE 3101

CMD ["pnpm", "run", "router:start"]
