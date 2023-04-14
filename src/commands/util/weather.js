const fetchCities = require('../../foundations/weather/fetchCities')
const sendTextEmbed = require('../../foundations/embed/sendTextEmbed')

module.exports = {
    'usage': '<city> <another-city> ...',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        fetchCities(arguments).then(result => {
            sendTextEmbed(message.channel, 'weather machine', result.join(' '), message.author)
        }).catch(err => {
            message.reply(`The weather could not be fetched: \`${err.message}\``)
        })
    }
}

