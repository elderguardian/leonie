# leonie.js

A discord bot which was made for a small community.

## Commands

- help: `no arguments`
- ping: `no arguments`

### fun
- dick: `<mention-or-text>`
- boob-size: `<mention-or-text>`
- gay: `<mention-or-text>`

### useful
- weather: `<city> <another-city> ...`
- math: `<problem>`
- sb: `<query>`

### moderation
- purge: `<positive-amount>`
- ban: `<mention>`
- kick: `<mention>`
- mute: `<mention>`


## Development

1. `git clone` the repo
2. run `npm i`
3. now start it `nodemon src/index.js`

### Creating a command

Just create a file in the `commands` folder or a sub-folder

```js
const {PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<mention>',
    'filter': {
        //Rules for arguments
        'arguments': {
            min: 1,
            max: 2,
            type: ['number', 'positive-number']
        },
        //Permissions the sender needs
        'sender': [
            PermissionsBitField.Flags.ManageRoles
        ],
        //Permissions the bot needs
        'bot': [
            PermissionsBitField.Flags.ManageRoles
        ]
    },
    'callback': (client, message, [mention, ...reasons]) => {
        message.reply('Hello World!')
    }
}

```

Just leave the filters empty if you do not need them.

Add the command in `lists/commands.js` after implementing the logic