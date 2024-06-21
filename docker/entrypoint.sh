#!/bin/sh

cd /app

# Function to restart the server
restart_server() {
  pkill -f 'bun src/server.js' # Kill the running server
  bun src/server.js & # Restart the server in the background
}

# Initial pull and start the server
git pull
restart_server

# Function to pull changes and restart the server if there are changes
pull_and_check() {
  git fetch origin
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse origin/$(git rev-parse --abbrev-ref HEAD))
  if [ $LOCAL != $REMOTE ]; then
    git pull
    restart_server
  fi
}

# Watch for changes and pull every 30 minutes or 1 minute based on the branch
if [ "$(git rev-parse --abbrev-ref HEAD)" = "main" ]; then
  while true; do
    pull_and_check
    sleep 1800 # 30 minutes
  done
else
  while true; do
    pull_and_check
    sleep 60 # 1 minute
  done
fi