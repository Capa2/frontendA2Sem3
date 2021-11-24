#!usrbinenv bash

PROJECT_NAME=A2Sem3
DROPLET_URL=karpantschof.com
DROPLET_USER=root
read -p "Press enter to deploy $PROJECT_NAME @ $DROPLET_URL"
echo ##############################
echo Building $PROJECT_NAME in ./build/
echo ##############################
npm run build

echo ##############################
echo Deploying $PROJECT_NAME @ $DROPLET_URL: /var/www/$PROJECT_NAME
echo ##############################
ssh $DROPLET_USER@$DROPLET_URL " bash -c \"rm -rf /var/www/$PROJECT_NAME; mkdir /var/www/$PROJECT_NAME\" "
scp -r ./build/* $DROPLET_USER@$DROPLET_URL:/var/www/$PROJECT_NAME
echo ##############################
read -p "Press Enter to continue."