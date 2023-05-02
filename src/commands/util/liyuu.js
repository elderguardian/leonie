const fetchImage = require('../../foundations/api/fetchLiyuuImage')
const sendImageEmbed = require('../../foundations/embed/sendImageEmbed')

module.exports = {
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

