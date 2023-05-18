const {getWelcomeChannel} = require("../../../foundations/mongo/guildManager")

module.exports = (client, message) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    getWelcomeChannel(mongoDb, guildId).then(channelId => {
        const channel = client.channels.cache.get(channelId)

        if (!channel) {
            message.channel.send('The welcome channel was once set but it seems like it got deleted.')
        } else {
            message.channel.send(`This guilds welcome channel is <#${channel.id}>.`)
        }

    }).catch(err => {
        message.channel.send(`Error while getting welcome channel: ${err.message}`)
    })
}