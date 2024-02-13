<div align="center">
  <a href="">
    <img src="https://github.com/elderguardian/leonie/assets/129489839/815f1398-e6c0-403c-804a-b2e8a8dfb4e9" width="150px">
  </a>

  <div>
    <h1>leonie</h1>
    <p>The ultimate open-source Discord bot</p>
  </div>

  <div>
    <a href="https://github.com/elderguardian/leonie#-key-features"><img src="https://img.shields.io/badge/🚀%20Key%20Features-ffffff.svg?style=for-the-badge&labelColor=000000&color=000000" alt="Key Features"></a>
    <a href="https://github.com/elderguardian/leonie#%EF%B8%8F-development-and-deployment"><img src="https://img.shields.io/badge/🛠️%20Development%20and%20Deployment-ffffff.svg?style=for-the-badge&labelColor=000000&color=000000" alt="Development and Deployment"></a>
    <a href="https://github.com/elderguardian/leonie#-license"><img src="https://img.shields.io/badge/📜%20License-ffffff.svg?style=for-the-badge&labelColor=000000&color=000000" alt="License"></a>
  </div>
</div>

### 🚀 I just want to try her
[You can invite the public instance](https://discord.com/api/oauth2/authorize?client_id=1143573089880387624&permissions=0&scope=bot)

### 🔑 Key Features
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
