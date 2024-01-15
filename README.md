<div align="center">
  <a href="">
    <img src="https://github.com/elderguardian/leonie/assets/129489839/815f1398-e6c0-403c-804a-b2e8a8dfb4e9" width="150px">
  </a>
</div>

### 🚀 Key Features
- Avatar Retrieval: Easily fetch user and server avatars.
- Weather Command: Get real-time weather updates using [wttr.in](https://wttr.in/)
- Anime and Manga Info: Access [AniList](https://anilist.co/) about anime, manga, and their characters.
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

<hr>

### 📜 License
This project is licensed under the [GNU General Public License, Version 3.0 (GPL-3.0).](./LICENSE)
