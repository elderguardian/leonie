# [The Leonie Discord Bot](https://github.com/elderguardian/leonie)

<a href="https://discord.com/api/oauth2/authorize?client_id=1143573089880387624&permissions=0&scope=bot" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Invite%20her-ffffff.svg?style=for-the-badge&labelColor=000000&color=000000" alt="Invite her">
</a>
<a href="https://github.com/elderguardian/leonie" target="_blank">
    <img src="https://img.shields.io/badge/👨‍💻%20Repository-ffffff.svg?style=for-the-badge&labelColor=000000&color=000000" alt="Repository">
</a>

## 😎 Selfhosting
### 1. Configuration
```bash
$ echo LEONIE_BOT_TOKEN=your-token >> .env
```
### 2. Deployment
```bash
$ npm i && npm run register-commands && npm run dev
```

#### 2.1 Using Docker to deploy
```yaml
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest # Or :latest-arm64
    volumes:
      - ./env:/usr/src/app/.env
```
> [!CAUTION]
> When using docker, you have to register the commands of your app manually!
g