const postAiringEmbed = require("../foundations/anime/postAiringEmbed")
const getAniListAnime = require("../foundations/anime/getAniListAnime");
const formatDelta = require("../foundations/time/formatDelta")
const {messageLink} = require("discord.js");
const {removeShow} = require("../foundations/mongo/guildManager");

module.exports = {
    'pattern': '50 */1 * * *',
    'callback': async client => {
        const database = client.db.db('leonie')
        const guilds = database.collection('guilds')

        const findResult = await guilds.find()

        findResult.forEach(guild => {

            if (
                !guild
                || !guild['anime_news_shows']
                || guild['anime_news_shows'].length <= 0
                || !guild['anime_news_channel']
            ) {
                return
            }

            const channelID = guild['anime_news_channel']
            const shows = guild['anime_news_shows']

            const channel = client.channels.cache.get(channelID)

            if (!channel || !shows || shows.length <= 0) {
                return
            }

            for (const showName of shows) {
                getAniListAnime(showName).then(animeData => {
                    const nextEpisode = animeData['nextAiringEpisode']

                    if (!nextEpisode) {
                        return
                    }

                    const airingLeft = formatDelta(nextEpisode['timeUntilAiring'])

                    if (airingLeft['hours'] !== 0 || airingLeft['days'] !== 0) {
                        return
                    }

                    const roleIdToMention = guild['anime_news_role']

                    if (roleIdToMention) {
                        channel.send(`<@&${roleIdToMention}>`)
                    }

                    postAiringEmbed(animeData, channel)

                    const currentEpisode = nextEpisode['episode'] ?? 0
                    const episodeCount = animeData['episodes'] ?? 0
                    const isLastEpisode = episodeCount && episodeCount >= currentEpisode

                    if (isLastEpisode) {
                        removeShow(client.db, guild['discord_id'], showName).then(r => {
                            channel.send('This is the last episode. The show got automatically removed.')
                        }).catch(r => {
                            channel.send('This is the last episode. Could not automatically remove the show.')
                        })
                    }

                }).catch(err => {
                    channel.send(`Could not post embed for the anime \`${showName}\`: ${err.message}`)
                })
            }

        })
    }
}


