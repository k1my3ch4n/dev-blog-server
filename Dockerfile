FROM node:20 AS build

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY . .

RUN yarn install
RUN yarn build

CMD ["node", "dist/server.js"]

EXPOSE 4000