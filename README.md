# Leonie
Leonie is a Discord bot which was originally written for a small community. It was built using the discord.js library. Since we value open-source software, we decided to publish the code.

## Key Featuress

- Get notifications about `airing anime` episodes on AniList.
- `Moderation` commands and welcome/goodbye messages.
- Other utility functionality like `getting weather or user avatars`

> **_NOTE:_** Leonie is currently going through a rewrite. Do not expect all the old features to be implemented already.

## Development and Deployment

First, create a `.env` file and add your token as `LEONIE_BOT_TOKEN`. Also make sure to register your commands before deploying.

```bash
$ echo LEONIE_BOT_TOKEN=your-token >> .env
$ npm run register-commands
```

### Development
```bash
$ npm i && npm run dev
```

### Deployment using Docker
```yaml
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest
    volumes:
      - ./env:/usr/src/app/.env
```

#### Updating image
```bash
$ docker pull ghcr.io/elderguardian/leonie:latest
```

