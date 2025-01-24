FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY . .

RUN yarn install --production
RUN yarn build

CMD ["node", "dist/server.js"]

EXPOSE 4000