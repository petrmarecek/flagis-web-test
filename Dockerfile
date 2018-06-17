FROM node:10.0.0

WORKDIR /home/node/app
COPY . /home/node/app
USER node

CMD ["node", "server"]
