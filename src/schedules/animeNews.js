const postAiringEmbed = require("../foundations/anime/postAiringEmbed")

module.exports = {
    'pattern': '0 */1 * * *',
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

            shows.forEach(showName => {
                postAiringEmbed(showName, channel, true)
            })

        })
    }
}


