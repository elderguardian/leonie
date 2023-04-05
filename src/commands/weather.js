const fetchCities = require('../foundations/weather/fetchCities')
const sendTextEmbed = require('../foundations/embed/sendTextEmbed')

module.exports = {
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        fetchCities(arguments).then(result => {
            sendTextEmbed(message, 'weather machine', result.join(' '))
        }).catch(err => {
            message.reply(`The weather could not be fetched: \`${err.message}\``)
        })
    }
}

