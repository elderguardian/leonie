const {removeShow} = require("../../../../foundations/mongo/guildManager")

module.exports = (client, message, show) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    removeShow(mongoDb, guildId, show).then(() => {
        message.channel.send(`Removed show \`${show}\` from the list.`)
    }).catch(err => {
        message.channel.send(`Error while removing show: ${err.message}`)
    })
}