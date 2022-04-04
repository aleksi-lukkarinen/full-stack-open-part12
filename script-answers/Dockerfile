
FROM node:16

WORKDIR /usr/src/app

COPY ./express-app/. .

RUN npm ci --only=production

ENV DEBUG=express-app:*

CMD npm start
