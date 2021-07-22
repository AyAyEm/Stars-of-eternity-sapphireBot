echo "Insert discord token"
read DISCORD_TOKEN
echo
echo "Insert database host"
read DB_HOST
echo
echo "Insert database name"
read DB_NAME
echo
echo "Insert database username"
read DB_USERNAME
echo
echo "Insert database password"
read DB_PASSWORD
echo
echo "Insert database port"
read DB_PORT

echo "DISCORD_TOKEN=$DISCORD_TOKEN" >> .env
echo "DB_HOST=$DB_HOST" >> .env
echo "DB_NAME=$DB_NAME" >> .env
echo "DB_USERNAME=$DB_USERNAME" >> .env
echo "DB_PASSWORD=$DB_PASSWORD" >> .env
echo "DB_PORT=$DB_PORT" >> .env
echo "NODE_ENV=production" >> .env

npm install -g pm2
npm install --production
pm2 start
