FROM oven/bun:1.3-alpine AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


FROM oven/bun:1.3-alpine AS runner

WORKDIR /app

ENV PORT=3003

COPY --from=deps --chown=bun:bun /app/node_modules ./node_modules
COPY --chown=bun:bun . .

USER bun

EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:${PORT}/api/health || exit 1

CMD ["bun", "run", "--preload", "./src/instrumentation.ts", "src/index.ts"]
