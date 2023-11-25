# The Leonie Discord Bot
Leonie is a Discord bot which was originally written for a small community. It was built using the discord.js library. Since we value open-source software, we decided to publish the code.

## Key Featuress
- Capable of retrieving server and global scope `user avatars`.
- `Weather` command that recognizes cities, airports, and other important locations.
- Ability to obtain information about `anime`, `manga`, and their `characters`.
- [GitHub Integration: View the bot's repository issues using a command
](https://elderguardian.github.io/blog/articles/INTEGRATING_GITHUB_INTO_LEONIE.html)
## Development and Deployment

### Configuration
```bash
$ echo LEONIE_BOT_TOKEN=your-token >> .env
```

Register the commands at Discord before running using `npm run register-commands`.

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

## License

[GNU General Public License, Version 3.0 (GPL-3.0)](./LICENSE)
