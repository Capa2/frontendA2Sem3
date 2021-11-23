#!usrbinenv bash

PROJECT_NAME=A2Sem3
DROPLET_URL=karpantschof.com
read -p "Press enter to deploy $PROJECT_NAME @ $DROPLET_URL"
echo ##############################
echo Building $PROJECT_NAME in ./build/
echo ##############################
npm run build

echo ##############################
echo Deploying $PROJECT_NAME @ remote: /var/www/$PROJECT_NAME
echo ##############################
ssh root@$DROPLET_URL " bash -c \"mkdir /var/www/$PROJECT_NAME\" "
scp -r ./build/* root@$DROPLET_URL:/var/www/$PROJECT_NAME
echo ##############################
read -p "Done. Press Enter to continue."