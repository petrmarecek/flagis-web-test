FROM node:10-alpine

WORKDIR /home/node/app
COPY . /home/node/app
USER node

ENV NODE_ENV production

CMD ["node", "server"]
