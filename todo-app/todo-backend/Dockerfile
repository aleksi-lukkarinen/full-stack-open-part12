
FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

ENV DEBUG=todo-backend:*

CMD npm start
