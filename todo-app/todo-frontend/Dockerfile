
FROM node:16 AS test-phase

ARG BACKEND_URL

USER node
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci
RUN CI=true npm test



FROM node:16 AS build-phase

ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL=${BACKEND_URL:-/api/}

ENV NODE_ENV=production

USER node
WORKDIR /usr/src/app

COPY --from=test-phase /usr/src/app /usr/src/app

RUN npm run build



FROM nginx:1.21.6 AS serve-phase

COPY ./nginx.prod.conf /etc/nginx/nginx.conf

COPY --from=build-phase /usr/src/app/build /usr/share/nginx/html
