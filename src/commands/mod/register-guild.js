const {PermissionsBitField} = require("discord.js");
const {registerGuild} = require("../../foundations/mongo/guildManager");

module.exports = {
    'usage': '',
    'filter': {
        'arguments': {
            max: 1,
        },
        'sender': [
            PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': async (client, message, arguments) => {
        const database = client.db.db('leonie')
        const guilds = database.collection('guilds')

        registerGuild(guilds, message.guild.id).then(() => {
            message.channel.send('Successfully registered this guild.')
        }).catch(err => {
            message.channel.send(`Error while registering this guild: ${err.message}`)
        })

    }
}

