const fetchImage = require('../../foundations/safebooru/fetchImage')
const sendImageEmbed = require('../../foundations/embed/sendImageEmbed')

module.exports = {
    'usage': '<query>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        fetchImage(arguments.join(' ')).then(result => {
            sendImageEmbed(message, 'safebooru machine', result)
        }).catch(err => {
            message.reply(`The image could not be fetched: \`${err.message}\``)
        })
    }
}

