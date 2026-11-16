# donkeyboard API: Express + Prisma, run with ts-node. Deployed on piplup (/srv/apps/donkeyboard).
FROM node:18-slim
# Prisma needs OpenSSL at runtime
RUN apt-get update -qq && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN npx prisma generate
EXPOSE 8080
# Entrypoint runs `prisma migrate deploy` before starting the server.
ENTRYPOINT ["/app/docker-entrypoint"]
CMD ["yarn", "run", "start"]
