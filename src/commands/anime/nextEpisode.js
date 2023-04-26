const getAniListAnime = require("../../foundations/anime/getAniListAnime")
const postAiringEmbed = require("../../foundations/anime/postAiringEmbed")
const generateEmbed = require('../../foundations/embed/generateEmbed')
const formatDelta = require('../../foundations/time/formatDelta')

module.exports = {
    'usage': '<id>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        const animeName = arguments.join(' ')
        postAiringEmbed(animeName, message.channel)
    }
}
