# Leonie
Leonie is a Discord bot which was originally written for a small community. It was built using the discord.js library. Since we value open-source software, we decided to publish the code.

## Key Featuress

- Get notifications about `airing anime` episodes on AniList.
- `Moderation` commands and welcome/goodbye messages.
- Other utility functionality like `getting weather or user avatars`

> **_NOTE:_** Leonie is currently going through a rewrite. Do not expect all the old features to be implemented already.

## Development and Deployment

### Development
```
git clone https://github.com/elderguardian/leonie.git#
cd leonie && npm i
```

Change the example configuration `config.json` to your needs.

```
npm run register-commands
npm run dev
```

### Deployment using Docker
```
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest
    volumes:
      - ./config.json:/usr/src/app/config.json
```

#### Updating image
```
docker pull ghcr.io/elderguardian/leonie:latest
```

