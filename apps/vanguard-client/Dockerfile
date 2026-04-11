# Base
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

# Build
FROM base AS build

WORKDIR /vanguard-client

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-client ./apps/client

RUN pnpm --filter vanguard-client install
RUN pnpm --filter vanguard-client vanguard:build

# Runtime
FROM base AS runtime

WORKDIR /vanguard-client

COPY --from=build /vanguard-client/apps/client/ddenox-0.1.0.tgz ./
COPY --from=build /vanguard-client/apps/client/dist ./dist
COPY --from=build /vanguard-client/apps/client/package.json ./

ENV NODE_ENV=production

RUN pnpm install

CMD ["node", "--run", "vanguard:start"]
