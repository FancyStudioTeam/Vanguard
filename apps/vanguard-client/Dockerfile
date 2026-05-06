# Base
FROM oven/bun AS base

WORKDIR /vanguard-client

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-client ./apps/client

RUN bun --filter vanguard-client install
RUN bun --filter vanguard-client vanguard:build

# Runtime
FROM base AS runtime

WORKDIR /vanguard-client

COPY --from=build /vanguard-client/apps/client/ddenox-0.1.0.tgz ./
COPY --from=build /vanguard-client/apps/client/dist ./dist
COPY --from=build /vanguard-client/apps/client/package.json ./

ENV NODE_ENV=production

RUN bun install

CMD ["bun", "run", "vanguard:start"]
