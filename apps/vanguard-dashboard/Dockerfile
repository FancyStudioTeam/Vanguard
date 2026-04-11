# Base
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

# Build
FROM base AS build

WORKDIR /vanguard-dashboard

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-dashboard ./apps/dashboard

RUN pnpm --filter vanguard-dashboard install
RUN pnpm --filter vanguard-dashboard router:build

# Runtime
FROM base AS runtime

WORKDIR /vanguard-dashboard

COPY --from=build /vanguard-dashboard/apps/dashboard/build ./build
COPY --from=build /vanguard-dashboard/apps/dashboard/package.json ./
COPY --from=build /vanguard-dashboard/apps/dashboard/public ./public

ENV HOST=127.0.0.1
ENV NODE_ENV=production

RUN pnpm install

EXPOSE 3000

CMD ["node", "--run", "router:start"]
