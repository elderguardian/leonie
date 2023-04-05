const fetchCities = require('../foundations/weather/fetchCities')
const sendEmbed = require('../foundations/embed/sendEmbed')

module.exports = {
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        fetchCities(arguments).then(result => {
            sendEmbed(message, 'weather machine', result.join(' '))
        }).catch(err => {
            message.reply(`The weather could not be fetched: \`${err.message}\``)
        })
    }
}

