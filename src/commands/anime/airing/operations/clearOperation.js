const {clearShows} = require("../../../../foundations/mongo/guildManager")

module.exports = async (client, message, show) => {
    try {
        clearShows(client.db, message.guild.id)
        message.reply('Successfully cleared this guilds show list.')
    } catch (err) {
        message.channel.search(`Error while clearing show list: ${err.message}`)
    }
}