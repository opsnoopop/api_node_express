# info
## docker image node
FROM node:24.3-alpine
  "node": "24.3.0"
  "express": "4.21.2"
  "mysql2": "3.14.1"
  "alpine": "3.22.0"

## docker image mysql
FROM mysql:8.4.5


# e.g. Use Repository
## Pull Project to Local
git clone https://github.com/opsnoopop/api_nodejs.git

## Go to Project
cd api_nodejs

## Start docker container
docker compose up -d --build

## Stop docker container
docker compose down

## Get Request URI
http://localhost:3000/

## Respone json
{"message":"Hello World from Node"}