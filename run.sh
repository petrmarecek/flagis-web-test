#!/bin/bash

echo "Running project, using env $NODE_ENV"

if [ "$NODE_ENV" = "production" ]
then
  npm run start:prod
elif [ "$NODE_ENV" = "staging" ]
then
  npm run start:staging
else
  npm run start
fi
