const getAniListAnime = require("../../../../foundations/anime/getAniListAnime")
const parseTitle = require("../../../../foundations/anime/parseTitle")
const {addShow, showExists} = require("../../../../foundations/mongo/guildManager")

module.exports = async (client, message, show) => {

    let showData
    try {
        showData = await getAniListAnime(show)
    } catch (err) {
        message.channel.send(`Error getting anime data: ${err.message}`)
        return
    }

    let title = showData['title']
    const showTitle = parseTitle(title)

    const mongoDb = client.db
    const guildId = message.guild.id

    try {
        const alreadyExists = await showExists(mongoDb, guildId, showTitle)

        if (alreadyExists) {
            message.reply('This has already been added to the guilds list.')
            return
        }

    } catch (err) {
        message.reply(`There was an error validating the existence of your show: ${err.message}`)
        return
    }

    try {
        await addShow(mongoDb, guildId, showTitle)
        message.channel.send(`Added show \`${showTitle}\` to the list.`)
    } catch (err) {
        message.channel.send(`Error while adding show: ${err.message}`)
    }
}