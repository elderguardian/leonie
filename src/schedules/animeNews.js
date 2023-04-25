const postAiringEmbed = require("../foundations/anime/postAiringEmbed")

module.exports = {
    'pattern': '0 * * * *',
    'callback': client => {

        console.log('1')

        const { shows, channelID } = client.config.animeNews

        if (!channelID || !shows) {
            return
        }


        console.log('2')

        const channel = client.channels.cache.get(channelID)

        if (!channel) {
            return
        }


        console.log('3')

        shows.forEach(showId => {
            postAiringEmbed(showId, channel, true)
        })


        console.log('4')

    }
}


