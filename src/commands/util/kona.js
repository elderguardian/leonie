const fetchImage = require('../../foundations/kona/fetchImage')
const sendImageEmbed = require('../../foundations/embed/sendImageEmbed')

module.exports = {
    'usage': '<query>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {

        if(!message.channel.nsfw) {
            message.reply('This command is `nsfw channel only`!')
            return
        }

        fetchImage(arguments.join(' ')).then(result => {
            sendImageEmbed(message, 'kona machine', result)
        }).catch(err => {
            message.reply(`The image could not be fetched: \`${err.message}\``)
        })
    }
}

