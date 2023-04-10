const {PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<positive-amount>',
    'filter': {
        'arguments': {
            min: 1,
            max: 2,
            type: ['positive-number']
        },
        'sender': [
            PermissionsBitField.Flags.ManageMessages
        ],
        'bot': [
            PermissionsBitField.Flags.ManageMessages
        ]
    },
    'callback': (client, message, arguments) => {
        const amountParsed = parseInt(arguments[0])

        message.channel.bulkDelete(amountParsed).then(() => {
            message.channel.send(`Deleted ${amountParsed} messages.`).then(msg => msg.delete(3000))
        }).catch(e => {
            message.reply('I can not delete these messages.')
        })
    }
}

