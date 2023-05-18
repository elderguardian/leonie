const {getGuildOrError} = require("../../../foundations/mongo/guildManager")
const sendTextEmbed = require('../../../foundations/embed/sendTextEmbed')

module.exports = (client, message) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    getGuildOrError(guilds, guildId).then(guild => {
        const channelId = guild['welcome_channel']
        const channel = client.channels.cache.get(channelId)

        const embedText = `${channelId ? ':white_check_mark:' : ':x:'} The guild needs to have a set welcome channel.\n\n`
            + `${channel ? ':white_check_mark:' : ':x:'} The set channel needs to still exist.\n`
            + '\n**Note:** It is not required to set messages. The bot has default values.'

        sendTextEmbed(message.channel, `Does this guild fulfill the requirements for welcome messages?`, embedText, message.author)

    }).catch(err => {
        message.channel.send(`Could not get your guild data: ${err.message}`)
    })
}