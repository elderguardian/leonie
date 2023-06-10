<div align="center" style="padding-top: 25px">
    <img src="leonie-banner.jpg" alt="Logo">
    <hr>
    <h1>leonie.js</h1>
    <b>Originally built to make lives easier</b>
    <hr style="margin-top: 40px">
</div>

<h2>About Leonie</h2>
Leonie is a Discord bot originally written for a small community.
It was built using the discord.js library.
Since we value open-source software, we decided to publish the code.

<h2>Features</h2>

<h3>Anime</h3>
- `air` Get notifications for airing anime episodes
- `anime` Get information about a given anime
- `next-episode` Get the next episode of an airing anime

<h3>Moderation</h3>
- `purge` Bulk clear multiple messages
- `ban` Ban a server member
- `kick` Kick a server member
- `mute` Give a member the `Muted` role
- `welcome` Set and get welcome channel and messages

<h3>Utility</h3>
- `weather` Get the weather in one or multiple cities
- `math` Calculate simple and complex math equations
- `sb` Search safebooru for images
- `kn` Search konachan for images
- `liyuu` Get a random image provided by the liyuu api
- `avatar` Get the avatar of one or multiple server members

<h2>Deployment and Development</h2>
1. `git clone` the repository
2. `cd` into the new directory and run `npm i`
3. move `config-example.json` to `config.json`
4. edit `config.json` to your liking

Now you will have to run the bot.

- If you just want to run it you can `node src/`
- If you are developing a new feature you can use `nodemon src/` after creating your own branch to get live updates.
- If you want to run the bot on a server you can `pm2 start src/` to let the bot run while you are logged out.