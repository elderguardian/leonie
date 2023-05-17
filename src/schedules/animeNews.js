const postAiringEmbed = require("../foundations/anime/postAiringEmbed")
const getAniListAnime = require("../foundations/anime/getAniListAnime");
const formatDelta = require("../foundations/time/formatDelta")

module.exports = {
    'pattern': '50 */1 * * *',
    'callback': async client => {
        const database = client.db.db('leonie')
        const guilds = database.collection('guilds')

        const findResult = await guilds.find()

        for (const guild of findResult) {

            if (
                !guild
                || !guild['anime_news_shows']
                || guild['anime_news_shows'].length <= 0
                || !guild['anime_news_channel']
            ) {
                continue
            }

            const channelID = guild['anime_news_channel']
            const shows = guild['anime_news_shows']

            const channel = client.channels.cache.get(channelID)

            if (!channel || !shows || shows.length <= 0) {
                continue
            }

            for (const showName of shows) {
                try {
                    const animeData = await getAniListAnime(showName)
                    const nextEpisode = animeData['nextAiringEpisode']

                    if (!nextEpisode) {
                        continue
                    }

                    const airingLeft = formatDelta(nextEpisode['timeUntilAiring'])

                    if (airingLeft['hours'] !== 0 || airingLeft['days'] !== 0) {
                        continue
                    }

                    postAiringEmbed(animeData, channel)
                } catch (err) {
                    channel.send(`Could not post embed for the anime \`${showName}\`: ${err.message}`)
                }
            }

        }
    }
}


