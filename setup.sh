echo "Insert discord token"
read DISCORD_TOKEN
echo
echo "Insert mongo db connection string"
read MONGO_CONNECTION_STRING

echo "DISCORD_TOKEN=$DISCORD_TOKEN" >> .env
echo "MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING" >> .env

npm install --production
