#!/bin/sh
# BIST App server deployment script

# kill old server processes
fuser -k 5000/tcp

# Add ssh key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id

# update the codebase
git pull --rebase
npm install

# start the servers in the background
# (nohup + stderr/stdout redirects so ssh doesn't hang)
# see https://stackoverflow.com/questions/29142/getting-ssh-to-execute-a-command-in-the-background-on-target-machine
sh -c '( (nohup npm run deploy >/dev/null 2>&1) & )'
