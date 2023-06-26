const fetchCities = require('../../foundations/api/fetchCityWeather')
const sendTextEmbed = require('../../foundations/embed/sendTextEmbed')

module.exports = {
    'usage': '<city> <city>...',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, args) => {
        fetchCities(args).then(result => {
            sendTextEmbed(message.channel, 'weather machine', result.join(' '), message.author)
        }).catch(err => {
            message.reply(`The weather could not be fetched: \`${err.message}\``)
        })
    }
}

