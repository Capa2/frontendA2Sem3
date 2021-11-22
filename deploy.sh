#!usrbinenv bash

PROJECT_NAME=A2Sem3
DROPLET_URL=karpantschof.com
echo ##############################
echo Building $PROJECT_NAME in ./build/
echo ##############################
npm run build

echo ##############################
echo Deploying $PROJECT_NAME @ remote: /var/www/$PROJECT_NAME
echo ##############################

scp -r ./build/* root@$DROPLET_URL:/var/www/$PROJECT_NAME