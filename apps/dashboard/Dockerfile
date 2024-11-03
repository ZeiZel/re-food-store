FROM node-alpine AS frontend-base
WORKDIR /opt/app
RUN npm i -g nx pnpm
CMD [ "nx", "run", "dashboard:dev" ]

FROM node-alpine AS build
WORKDIR /opt/app
COPY *.json *.yaml .npmrc ./
RUN npm i -g pnpm nx
RUN NODE_ENV=development pnpm i --frozen-lockfile
ADD ./ ./
RUN nx build dashboard

FROM node-alpine AS result
WORKDIR /opt/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE $PORT
RUN npm i -g pnpm nx
COPY *.json *.yaml .npmrc ./
RUN pnpm i --only=prod
COPY --from=build /opt/app/dist/apps/dashboard .
RUN rm -rf /opt/app/dist/apps/dashboard/.next/cache
CMD ["pnpm", "start"]
