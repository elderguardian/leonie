const {removeNewsRole} = require("../../../../foundations/mongo/guildManager")

module.exports = async (client, message, show) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    removeNewsRole(mongoDb, guildId).then(() => {
        message.channel.send(`Removed news role for this server.`)
    }).catch(err => {
        message.channel.send(`Error while removing role: ${err.message}`)
    })
}