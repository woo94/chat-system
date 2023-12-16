FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build
CMD yarn node dist/app.js

# FROM node:18
# WORKDIR /app
# COPY --from=builder /app/.yarn /app/.yarn
# COPY --from=builder /app/dist /app/dist
# COPY --from=builder /app/.pnp* /app
# COPY --from=builder /app/yarn.lock /app/yarn.lock
# COPY --from=builder /app/package.json /app/package.json
# COPY --from=builder /app/.yarnrc.yml /app/.yarnrc.yml
# RUN corepack enable && yarn set version stable && yarn install
# CMD yarn node dist/app.js