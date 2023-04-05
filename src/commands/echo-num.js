
module.exports = {
    'filter': {
        'arguments': {
            min: 1,
            type: ['string', 'number'],
        },
    },
    'callback': (client, message, arguments) => {
        const parsedNumber = parseInt(arguments[1])
        message.reply(`you entered ${arguments[0]} and the number ${parsedNumber}`)
    }
}
