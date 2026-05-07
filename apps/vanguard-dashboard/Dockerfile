FROM node:24-slim

RUN corepack enable pnpm

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json turbo.json ./
COPY apps/vanguard-dashboard apps/vanguard-dashboard

RUN pnpm install
RUN pnpm run turbo:build

WORKDIR /main/apps/vanguard-dashboard

ENV HOST=0.0.0.0
ENV PORT=3101

ENV NODE_ENV=production

EXPOSE 3101

CMD ["pnpm", "run", "router:start"]
