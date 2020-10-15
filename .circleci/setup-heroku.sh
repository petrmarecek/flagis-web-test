#!/bin/bash

wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_USER
  password $HEROKU_TOKEN
machine git.heroku.com
  login $HEROKU_USER
  password $HEROKU_TOKEN
EOF
