# Base
FROM oven/bun AS base

WORKDIR /vanguard-api

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-api ./apps/api

RUN bun --filter vanguard-api install
RUN bun --filter vanguard-api nest:build

# Runtime
FROM base AS runtime

WORKDIR /vanguard-api

COPY --from=build /vanguard-api/apps/api/dist ./dist
COPY --from=build /vanguard-api/apps/api/package.json ./

ENV HOST=0.0.0.0
ENV PORT=3001

ENV NODE_ENV=production

RUN bun install

EXPOSE 3001

CMD ["bun", "run", "nest:start"]
