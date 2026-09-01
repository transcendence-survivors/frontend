FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.15.0
RUN pnpm config set store-dir /pnpm/store

COPY pnpm-workspace.yaml package.json ./
COPY apps/network/client/package.json ./apps/network/client/package.json
COPY apps/game/ui/package.json ./apps/game/ui/package.json
COPY apps/game/shared-package/package.json ./apps/game/shared-package/package.json

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install

COPY apps/network/client ./apps/network/client
COPY apps/game/ui ./apps/game/ui
COPY apps/game/shared-package ./apps/game/shared-package

WORKDIR /app/apps/network/client

EXPOSE 3000

CMD ["pnpm", "exec", "next", "dev", "--hostname", "0.0.0.0", "--port", "3000"]