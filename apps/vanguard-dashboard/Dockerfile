# Base
FROM oven/bun AS build

WORKDIR /vanguard-dashboard

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/vanguard-dashboard ./apps/dashboard

RUN bun --filter vanguard-dashboard install
RUN bun --filter vanguard-dashboard router:build

# Runtime
FROM base AS runtime

WORKDIR /vanguard-dashboard

COPY --from=build /vanguard-dashboard/apps/dashboard/build ./build
COPY --from=build /vanguard-dashboard/apps/dashboard/package.json ./
COPY --from=build /vanguard-dashboard/apps/dashboard/public ./public

ENV NODE_ENV=production

RUN bun install

EXPOSE 3101

CMD ["bun", "run", "router:start"]
