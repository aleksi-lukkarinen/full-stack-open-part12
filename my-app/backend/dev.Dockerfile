ARG PHONEBOOK_BACKEND_NODE_IMAGE=16.14.2-alpine3.15


FROM node:${PHONEBOOK_BACKEND_NODE_IMAGE}

ARG PHONEBOOK_BACKEND_NODE_IMAGE=16.14.2-alpine3.15
RUN echo "Backend Node image: ${PHONEBOOK_BACKEND_NODE_IMAGE}"

USER node
WORKDIR /usr/src/app
ENV DEBUG=phonebook-backend:*

RUN mkdir /usr/src/app/data && chown node:node /usr/src/app/data
VOLUME [ "/usr/src/app/data" ]

COPY --chown=node:node package.json package-lock.json ./
RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD ["node", "node_modules/.bin/json-server", "./data/db.json"]
