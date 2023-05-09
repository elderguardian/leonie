const {setNewsChannel} = require("../../../foundations/mongo/guildManager")

module.exports = (client, message, show) => {
    const channel = message.mentions.channels.first()

    if (!channel) {
        message.channel.send('Please mention a channel.')
        return
    }

    const mongoDb = client.db
    const guildId = message.guild.id
    const channelId = channel.id

    setNewsChannel(mongoDb, guildId, channelId).then(() => {
        message.channel.send(`News channel was set to \`${channel.name}\`.`)
    }).catch(err => {
        message.channel.send(`Error while setting channel: ${err.message}`)
    })
}