# Leonie
Leonie is a Discord bot which was originally written for a small community. It was built using the discord.js library. Since we value open-source software, we decided to publish the code.

## Key Featuress

- Get notifications about `airing anime` episodes on AniList.
- `Moderation` commands and welcome/goodbye messages.
- Other utility functionality like `getting weather or user avatars`

## Running Leonie

### Setup
1. ```git clone https://github.com/elderguardian/leonie.git```
2. ```cd leonie && npm i```
3. ```cp config-example.json config.json```
4. *Configure `config.json`*

### Starting
- One time run: ```node src/```
- Permanent process using [PM2](https://www.npmjs.com/package/pm2): ```npm i -g pm2 && pm2 src/```
- Development using [Nodemon](https://www.npmjs.com/package/nodemon): ```npm i -g nodemon && nodemon src/```

## Docker

##### **`docker-compose.yml`**
```
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest
    volumes:
      - ./config.json:/usr/src/app/config.json
```

Copy the `example-config.json` from the repository into the same directory as the `docker-compose.yml` and change it to your needs.


### Running MongoBD in a container to share a network with Leonie

```
$ docker network create leonie
```

##### **`leonie/docker-compose.yml`**
```
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest
    volumes:
      - ./config.json:/usr/src/app/config.json
    networks:
      - leonie

networks:
  leonie:
    external: true
```

##### **`mongodb/docker-compose.yml`**
```
services:
  mongodb:
    image: mongo
    volumes:
      - './data:/data/db'
    networks:
      leonie:
        aliases:
          - mongodb

networks:
  leonie:
    external: true
```

##### **`config.json`**
```
[...]
  "mongo": {
    "url": "mongo://mongodb:27017/"
  }
[...]
```

### Updating Image

```
$ docker pull ghcr.io/elderguardian/leonie:latest
```
