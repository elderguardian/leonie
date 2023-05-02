const postAiringEmbed = require("../../foundations/anime/postAiringEmbed")

module.exports = {
    'usage': '<name>',
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
