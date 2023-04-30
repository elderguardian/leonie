const postAiringEmbed = require("../foundations/anime/postAiringEmbed")

module.exports = {
    'pattern': '0 */1 * * *',
    'callback': async client => {
        const { shows, channelID } = client.config.animeNews

        if (!channelID || !shows) {
            return
        }

        const channel = client.channels.cache.get(channelID)

        if (!channel) {
            return
        }
        
        shows.forEach(showName => {
            postAiringEmbed(showName, channel, true)
        })

    }
}


