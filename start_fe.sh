#!/bin/bash

export NODE_ENV=production
export KEYPRACTICA_REALM=keypractica_auth
export KEYPRACTICA_AUTH_SERVER_URL=https://auth.keypractica.com
export KEYPRACTICA_RESOURCE=keypractica_projects
export PORT=46220

WORKING_DIRECTORY="/home/keypractica/fe_server"


NODE_EXECUTABLE="/root/.nvm/versions/node/v18.13.0/bin/node"

echo "Starting Keypractica_FE_app..."
cd $WORKING_DIRECTORY
$NODE_EXECUTABLE server.js
