FROM node:latest as builder

WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED 1
COPY ./frontend /app/frontend
RUN yarn install
RUN NODE_ENV=production yarn build


FROM node:latest as runner

WORKDIR /app/frontend

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/frontend/next.config.js next.config.js
COPY --from=builder /app/frontend/.next .next
COPY --from=builder /app/frontend/.env .env
COPY --from=builder /app/frontend/public public
COPY --from=builder /app/frontend/node_modules node_modules
COPY --from=builder /app/frontend/package.json package.json
COPY --from=builder /app/frontend/yarn.lock yarn.lock

CMD ["yarn", "start"]