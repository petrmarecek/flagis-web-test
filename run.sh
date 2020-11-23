#!/bin/bash

echo "Running project, using env $NODE_ENV"

if [ "$NODE_ENV" = "production" ]
then
  yarn start:prod
elif [ "$NODE_ENV" = "staging" ]
then
  yarn start:staging
else
  yarn start
fi
