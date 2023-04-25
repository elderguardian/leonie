const getAniListAnime = require("../../foundations/anime/getAniListAnime")
const postAiringEmbed = require("../../foundations/anime/postAiringEmbed")
const generateEmbed = require('../../foundations/embed/generateEmbed')
const formatDelta = require('../../foundations/time/formatDelta')

module.exports = {
    'usage': '<id>',
    'filter': {
        'arguments': {
            min: 1,
            max: 2,
            type: ['integer']
        },
    },
    'callback': (client, message, arguments) => {
        const animeId = arguments[0]
        postAiringEmbed(animeId, message.channel)
    }
}
