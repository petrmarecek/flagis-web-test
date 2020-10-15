FROM node:lts-alpine

WORKDIR /home/node/app
COPY . /home/node/app
USER node

ENV NODE_ENV production

CMD ["node", "server"]
