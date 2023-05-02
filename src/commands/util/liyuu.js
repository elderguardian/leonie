const fetchImage = require('../../foundations/liyuu/fetchImage')
const sendImageEmbed = require('../../foundations/embed/sendImageEmbed')

module.exports = {
    'usage': 'no arguments',
    'filter': {
        'arguments': {
            max: 1,
        },
    },
    'callback': (client, message, arguments) => {
        fetchImage(arguments.join(' ')).then(result => {
            sendImageEmbed(message.channel, 'liyuu machine', result, message.author)
        }).catch(err => {
            message.reply(`The image could not be fetched: \`${err.message}\``)
        })
    }
}

