FROM oven/bun:alpine AS frontend-base
WORKDIR /opt/app
RUN bun i -g nx
CMD [ "nx", "run", "dashboard:dev" ]

FROM oven/bun:alpine AS build
WORKDIR /opt/app
COPY *.json *.yaml .npmrc ./
RUN bun i -g nx
RUN NODE_ENV=development pnpm i --frozen-lockfile
ADD ./ ./
RUN nx build dashboard

FROM oven/bun:alpine AS result
WORKDIR /opt/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE $PORT
RUN bun i -g nx
COPY *.json *.yaml .npmrc ./
RUN i --only=prod
COPY --from=build /opt/app/dist/apps/dashboard .
RUN rm -rf /opt/app/dist/apps/dashboard/.next/cache
CMD ["bun", "start"]
