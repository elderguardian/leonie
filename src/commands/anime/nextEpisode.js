const postAiringEmbed = require("../../foundations/anime/postEmbed/postAiringEmbed")
const {getAniListAnime} = require("../../foundations/anime/getData/getMediaFromAniList")

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
