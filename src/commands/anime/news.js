const {PermissionsBitField} = require("discord.js");
const {addShow, getShows, removeShow, setNewsChannel} = require("../../foundations/mongo/guildManager");

module.exports = {
    'usage': '<operation>',
    'filter': {
        'arguments': {
            min: 1,
        },
        'sender': [
            PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': (client, message, [operation, ...showSplit]) => {
        const show = showSplit.join(' ')
        const mongoDb = client.db
        const guildId = message.guild.id

        switch (operation.toLowerCase()) {

            case 'add':
                addShow(mongoDb, guildId, show).then(() => {
                    message.channel.send(`Added show \`${show}\` to the list.`)
                }).catch(err => {
                    message.channel.send(`Error while adding show: ${err.message}`)
                })
                break

            case 'remove':
                removeShow(mongoDb, guildId, show).then(() => {
                    message.channel.send(`Removed show \`${show}\` from the list.`)
                }).catch(err => {
                    message.channel.send(`Error while removing show: ${err.message}`)
                })
                break

            case 'ls':
                getShows(mongoDb, guildId).then(shows => {
                    message.channel.send(`Shows: \`${shows.join(', ')}\``)
                }).catch(err => {
                    message.channel.send(`Error while fetching shows: ${err.message}`)
                })
                break
            case 'set-channel':
                const channel = message.mentions.channels.first()

                if (!channel) {
                    message.channel.send('Please mention a channel.')
                    return
                }

                const channelId = channel.id

                setNewsChannel(mongoDb, guildId, channelId).then(() => {
                    message.channel.send(`News channel was set to \`${channel.name}\`.`)
                }).catch(err => {
                    message.channel.send(`Error while setting channel: ${err.message}`)
                })
                break
            default:
                message.channel.send('This argument is invalid. Valid arguments are `add`, `remove`, `ls` and `set-channel`')
                break

        }

    }
}
