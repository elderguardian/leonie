const {getShows} = require("../../../../foundations/mongo/guildManager")

module.exports = (client, message) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    getShows(mongoDb, guildId).then(shows => {
        message.channel.send(`Shows: \`${shows.join(', ')}\``)
    }).catch(err => {
        message.channel.send(`Error while fetching shows: ${err.message}`)
    })
}