#### 🏃‍♀️ Running

##### Configuration

```bash
git clone https://github.com/elderguardian/leonie.git

echo LEONIE_BOT_TOKEN=your-token >> .env
npm i && npm run register-commands
```

Setting your token and registering the commands to your app is crucial
and needs to be done before running the bot.
After configuring that, you can run a development environment (`npm run dev`) or deploy (`npm i buildstart`).

##### Docker Deployment

```yaml
services:
  leonie:
    image: ghcr.io/elderguardian/leonie:latest # Or :latest-arm64
    volumes:
      - ./env:/usr/src/app/.env
```

After deploying your container, you maybe still need to register the application commands.

```bash
sudo docker ps # Find out the ID of your container
sudo docker exec -it <container-id> /bin/bash
cd /usr/src/app && npm run register-commands
```
