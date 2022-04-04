
FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node ./express-app/. .

RUN npm ci --only=production

ENV DEBUG=express-app:*

USER node

CMD npm start
