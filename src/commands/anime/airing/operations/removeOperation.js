const {removeShow, showExists} = require("../../../../foundations/mongo/guildManager")

module.exports = async (client, message, show) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    try {
        const isValidShow = await showExists(mongoDb, guildId, show)

        if (!isValidShow) {
            message.reply('This show has not been added yet.')
            return
        }

    } catch (err) {
        message.reply(`There was an error validating the existence of your show: ${err.message}`)
        return
    }

    removeShow(mongoDb, guildId, show).then(() => {
        message.channel.send(`Removed show \`${show}\` from the list.`)
    }).catch(err => {
        message.channel.send(`Error while removing show: ${err.message}`)
    })
}