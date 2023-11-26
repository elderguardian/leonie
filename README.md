<img src="https://github.com/elderguardian/leonie/assets/129489839/1cedd811-21af-4f26-9299-406dc2ac3fcc" align="right" width="250px">

# Leonie
An awesome Discord bot with a modular architecture, originally designed for a small community.

### 🚀 Key Features
- Avatar Retrieval: Easily fetch user avatars from both server and global scopes.
- Weather Command: Get real-time weather updates for cities, airports, and other locations.
- Anime and Manga Info: Access information about anime, manga, and their characters.
- GitHub Integration: View the bot's repository issues directly through a simple command. [Learn more](https://elderguardian.github.io/blog/articles/INTEGRATING_GITHUB_INTO_LEONIE.html)

### 🛠️ Development and Deployment
> [!IMPORTANT]
> Remember to configure your bot's token! <br> `$ echo LEONIE_BOT_TOKEN=your-token >> .env`

### Starting the development environment with a single command
```bash
$ npm i npm run register-commands && npm run dev
```

### Using Docker to deploy
```yaml
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest
    volumes:
      - ./env:/usr/src/app/.env
```

> [!CAUTION]
> You have to register the commands of your app manually! <br> `$ npm run register-commands`
