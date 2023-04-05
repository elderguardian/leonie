
module.exports = {
    'usage': '<number>',
    'filter': {
        'arguments': {
            min: 1,
            max: 1,
            type: ['number'],
        },
    },
    'callback': (client, message, arguments) => {
        message.reply(`you entered the number ${arguments[0]}`)
    }
}
