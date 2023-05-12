const {getGuildOrError} = require("../../../../foundations/mongo/guildManager")
const sendTextEmbed = require('../../../../foundations/embed/sendTextEmbed')

module.exports = (client, message) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    getGuildOrError(guilds, guildId).then(guild => {

        const shows = guild['anime_news_shows']
        const channelId = guild['anime_news_channel']

        const channel = client.channels.cache.get(channelId)

        const embedText =
            `${shows && shows.length > 0 ? ':white_check_mark:' : ':x:'} The guild needs to have added shows.\n\n`
            + `${channelId ? ':white_check_mark:' : ':x:'} The guild needs to have a set news channel.\n\n`
            + `${channel ? ':white_check_mark:' : ':x:'} The set channel needs to still exist.\n\n`

        sendTextEmbed(message.channel, `Does this guild fulfill the news requirements?`, embedText, message.author)

    }).catch(err => {
        message.channel.send(`Could not get your guild data: ${err.message}`)
    })
}