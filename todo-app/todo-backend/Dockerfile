
FROM node:16

ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

CMD npm start
