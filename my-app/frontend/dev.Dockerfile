ARG PHONEBOOK_FRONTEND_NODE_IMAGE=16.14.2-alpine3.15


FROM node:${PHONEBOOK_FRONTEND_NODE_IMAGE}

ARG PHONEBOOK_FRONTEND_NODE_IMAGE=16.14.2-alpine3.15
RUN echo "Frontend Node image: ${PHONEBOOK_FRONTEND_NODE_IMAGE}"

USER node
WORKDIR /usr/src/app
ENV DEBUG=phonebook-frontend:*

COPY --chown=node:node package.json package-lock.json ./
RUN npm install && npm prune && npm cache clean --force

COPY --chown=node:node . .

ARG PHONEBOOK_BACKEND_URL=http://localhost:3001/
RUN echo "Backend URL: ${PHONEBOOK_BACKEND_URL}"
ENV REACT_APP_PHONEBOOK_SERVER_URL=${PHONEBOOK_BACKEND_URL}

CMD ["node", "node_modules/.bin/react-scripts", "start"]
