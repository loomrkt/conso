
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /base
COPY package*.json .
RUN yarn install 

FROM node:20-alpine AS builder

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /build

COPY --from=base /base/node_modules ./node_modules

COPY src ./src
COPY public ./public
COPY package*.json .
COPY tsconfig.json components.json ./
COPY next.config.ts  ./
COPY postcss.config.mjs ./
COPY eslint.config.mjs ./
COPY next-env.d.ts ./


RUN yarn build

FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /build/public ./public
COPY --from=builder --chown=nextjs:nodejs /build/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]