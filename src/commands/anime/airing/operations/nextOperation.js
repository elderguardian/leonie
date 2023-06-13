const {getGuildOrError} = require("../../../../foundations/mongo/guildManager")
const nextAiringDataFromList = require("../../../../foundations/anime/getData/nextAiringDataFromList")
const parseTitle = require("../../../../foundations/anime/parseTitle");
const formatDelta = require("../../../../foundations/time/formatDelta");

module.exports = async (client, message) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    let guild;

    try {
        guild = await getGuildOrError(guilds, guildId);
    } catch(err) {
        message.channel.send(`Could not get your guild data: ${err.message}`)
        return
    }

    const shows = guild['anime_news_shows']

    if (!shows) {
        message.channel.send(`This guild does not have any shows listed.`)
        return
    }

    let nextAiringShowData


    try {
        message.channel.send('Fetching list...')
        nextAiringShowData = await nextAiringDataFromList(shows)
    } catch (err) {
        message.channel.send(`Could fetch the next airing show: ${err.message}`)
        return
    }

    const showTitleObject = nextAiringShowData['title']
    const title = parseTitle(showTitleObject)

    const airingEpisode = nextAiringShowData['nextAiringEpisode']
    const timeLeftUnix = airingEpisode['timeUntilAiring']
    const timeLeftObject = formatDelta(timeLeftUnix)

    const timeLeftString = `\`${timeLeftObject['days']}d\` `
        + `\`${timeLeftObject['hours']}h\` `
        + `\`${timeLeftObject['minutes']}m\` `
        + `\`${timeLeftObject['seconds']}s\``

    message.reply(`Show: \`${title}\` \nTime left: ${timeLeftString}`)
}