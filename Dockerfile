FROM node:16-alpine

RUN apk add git bash

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN npm i npm@latest -g && npm install pm2 -g && npm cache clean --force

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production=false && npm cache clean --force

COPY . .
RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "pm2-runtime", "--raw", "dist/eternity.js" ]
