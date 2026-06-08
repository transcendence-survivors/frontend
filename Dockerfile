FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm
RUN pnpm config set store-dir /pnpm/store

COPY package.json ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "exec", "next", "dev", "--hostname", "0.0.0.0", "--port", "3000"]