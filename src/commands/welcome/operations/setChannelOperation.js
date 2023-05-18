const {setWelcomeChannel} = require("../../../foundations/mongo/guildManager")

module.exports = (client, message) => {
    const channel = message.mentions.channels.first()

    if (!channel) {
        message.channel.send('Please mention a channel.')
        return
    }

    const mongoDb = client.db
    const guildId = message.guild.id
    const channelId = channel.id

    setWelcomeChannel(mongoDb, guildId, channelId).then(() => {
        message.channel.send(`The welcome channel was set to \`${channel.name}\`.`)
    }).catch(err => {
        message.channel.send(`Error while setting welcome channel: ${err.message}`)
    })
}