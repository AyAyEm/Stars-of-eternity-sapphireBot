#!/bin/bash

secret_insert() {
    local secretName="$1"
    echo "Insert ${secretName/-/ }: "
    local secretValue
    read secretValue
    local len=${#secretValue}
    if [ "${len}" -gt "0" ]; then
        docker secret rm ${secretName} &>/dev/null
        printf "${secretValue}" | docker secret create ${secretName} - &>/dev/null
    fi
}

secret_insert "discord-token"
secret_insert "mongo-hostname"
secret_insert "mongo-user"
secret_insert "mongo-password"

docker stack rm eternity &>/dev/null
sleep 5s
docker stack deploy -c ./docker-compose.yml -c ./docker-compose.prod.yml eternity
