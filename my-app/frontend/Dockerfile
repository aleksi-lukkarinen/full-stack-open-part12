ARG PHONEBOOK_FRONTEND_NODE_IMAGE=16.14.2-alpine3.15
ARG PHONEBOOK_FRONTEND_NGINX_IMAGE=1.21.6-alpine


FROM node:${PHONEBOOK_FRONTEND_NODE_IMAGE} AS build-phase

ARG PHONEBOOK_FRONTEND_NODE_IMAGE=16.14.2-alpine3.15
RUN echo "Frontend Node image: ${PHONEBOOK_FRONTEND_NODE_IMAGE}"

ENV NODE_ENV=production
USER node
WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --production

COPY --chown=node:node . .

ARG PHONEBOOK_BACKEND_URL=/api/
RUN echo "Backend URL: ${PHONEBOOK_BACKEND_URL}"
ENV REACT_APP_PHONEBOOK_SERVER_URL=${PHONEBOOK_BACKEND_URL}

RUN npm run build


FROM nginx:${PHONEBOOK_FRONTEND_NGINX_IMAGE} AS serve-phase

ARG PHONEBOOK_FRONTEND_NGINX_IMAGE=1.21.6-alpine
RUN echo "Frontend Nginx image: ${PHONEBOOK_FRONTEND_NGINX_IMAGE}"

COPY ./nginx.prod.conf /etc/nginx/nginx.conf

COPY --from=build-phase /usr/src/app/build /usr/share/nginx/html
