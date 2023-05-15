const {getShows} = require("../../../../foundations/mongo/guildManager")
const sendTextEmbed = require('../../../../foundations/embed/sendTextEmbed')

module.exports = (client, message) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    getShows(mongoDb, guildId).then(shows => {
        const embedTitle = `Show List for: **${message.guild.name}**`
        const embedDescription = `\`${shows.join('`\n`')}\``

        sendTextEmbed(message.channel, embedTitle, embedDescription, message.author)
    }).catch(err => {
        message.channel.send(`Error while fetching shows: ${err.message}`)
    })
}