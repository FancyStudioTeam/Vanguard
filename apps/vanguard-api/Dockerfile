FROM oven/bun

WORKDIR /main

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./

COPY apps/vanguard-api apps/vanguard-api
COPY packages/prisma packages/prisma

RUN bun install

WORKDIR /main/apps/vanguard-api

RUN bun run nest:build

ENV HOST=0.0.0.0
ENV PORT=3001

ENV NODE_ENV=production

EXPOSE 3001

CMD ["bun", "run", "nest:start"]
