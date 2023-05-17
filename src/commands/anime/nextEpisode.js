const postAiringEmbed = require("../../foundations/anime/postAiringEmbed")
const getAniListAnime = require("../../foundations/anime/getAniListAnime");

module.exports = {
    'usage': '<name>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        const animeName = arguments.join(' ')

        getAniListAnime(animeName).then(animeData => {
            postAiringEmbed(animeData, message.channel)
        }).catch(err => {
            message.channel.send(`Could not get this anime: ${err.message}`)
        })

    }
}
