const fetchImage = require('../../foundations/kona/fetchImage')
const sendImageEmbed = require('../../foundations/embed/sendImageEmbed')

module.exports = {
    'usage': '<query>',
    'filter': {
        'arguments': {
            min: 1,
        },
        'nsfw': true,
    },
    'callback': (client, message, arguments) => {
        fetchImage(arguments.join(' ')).then(result => {
            sendImageEmbed(message.channel, 'kona machine', result, message.author)
        }).catch(err => {
            message.reply(`The image could not be fetched: \`${err.message}\``)
        })
    }
}

