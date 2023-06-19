<div align="center" style="padding-top: 25px;">
    <img src="leonie-banner.jpg" alt="Logo">
    <h1>leonie.js</h1>
    <b>Originally built to make lives easier</b>
</div>

## About Leonie
Leonie is a Discord bot originally written for a small community.
It was built using the discord.js library.
Since we value open-source software, we decided to publish the code.

## Features

### Anime
- `air` Get notifications for airing anime episodes
- `anime` Get information about a given anime
- `next-episode` Get the next episode of an airing anime

### Moderation
- `purge` Bulk clear multiple messages
- `ban` Ban a server member
- `kick` Kick a server member
- `mute` Give a member the `Muted` role
- `welcome` Set and get welcome channel and messages

### Utility
- `weather` Get the weather in one or multiple cities
- `math` Calculate simple and complex math equations
- `sb` Search safebooru for images
- `kn` Search konachan for images
- `avatar` Get the avatar of one or multiple server members

## Deployment and Development

### Running with node/pm2
1. `git clone` the repository
2. `cd` into the new directory and run `npm i`
3. move `config-example.json` to `config.json`
4. edit `config.json` to your liking

Now you will have to run the bot.

- If you just want to run it you can `node src/`
- If you are developing a new feature you can use `nodemon src/` after creating your own branch to get live updates.
- If you want to run the bot on a server you can `pm2 start src/` to let the bot run while you are logged out.


### Docker

Create a `config.json` inside a folder and add your configuration.
An example can be found in the repository root directory.

#### With MongoDB exposed

##### **`docker-compose.yml`**
```
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest
    volumes:
      - ./config.json:/usr/src/app/config.json
```

##### **`config.json`**
```
[...]
  "mongo": {
    "url": "mongodb://127.0.0.1:27017/"
  }
[...]
```

#### With MongoDB in another container

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