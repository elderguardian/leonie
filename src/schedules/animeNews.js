const postAiringEmbed = require("../foundations/anime/postAiringEmbed")

module.exports = {
    'pattern': '* * * * *',
    'callback': async client => {
        const database = client.db.db('leonie')
        const guilds = database.collection('guilds')

        const findResult = await guilds.find()

        findResult.forEach(guild => {

            if (
                !guild
                || guild['anime_news_shows'].length <= 0
                || !guild['anime_news_channel']
                || !guild['anime_news_role']
            ) {
                return
            }

            const channelID = guild['anime_news_channel']
            const shows = guild['anime_news_shows']

            const channel = client.channels.cache.get(channelID)

            if (!channel || shows.length <= 0) {
                return
            }

            shows.forEach(showName => {
                postAiringEmbed(showName, channel, true)
            })

        })
    }
}


