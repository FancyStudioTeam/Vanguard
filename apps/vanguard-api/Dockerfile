# Base
FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

# Build
FROM base AS build

WORKDIR /vanguard-api

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-api ./apps/api

RUN pnpm --filter vanguard-api install
RUN pnpm --filter vanguard-api nest:build

# Runtime
FROM base AS runtime

WORKDIR /vanguard-api

COPY --from=build /vanguard-api/apps/api/dist ./dist
COPY --from=build /vanguard-api/apps/api/package.json ./

ENV NODE_ENV=production

RUN pnpm install

EXPOSE 3001

CMD ["node", "--run", "nest:start"]
