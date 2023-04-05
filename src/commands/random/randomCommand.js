const randomResult = require("./randomResult");

module.exports = (displayType, max) => {

    return {
        'usage': '<mention-or-text>',
        'filter': {
            'arguments': {
                min: 1,
            },
        },
        'callback': (client, message, arguments) => {
            const mentionedUser = message.mentions.users.first()
            const personJudged = !mentionedUser ? arguments.join(' ') : mentionedUser.username

            randomResult(message, personJudged, displayType, max)
        }
    }

}