const {Guild, PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<positive-amount>',
    'filter': {
        'arguments': {
            min: 1,
            type: ['positive-number']
        },
    },
    'callback': (client, message, arguments) => {

        const senderPermissions = message.guild.members.resolve(message.author).permissions

        if (!senderPermissions.has(PermissionsBitField.Flags.ManageMessages)) {
            message.reply('You can\'t use this command.')
            return
        }

        const botPermissions = message.guild.members.me.permissions

        if (!botPermissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('I am missing the permissions to manage messages.')
        }

        const amountParsed = parseInt(arguments[0])

        message.channel.bulkDelete(amountParsed).then(() => {
            message.channel.send(`Deleted ${amountParsed} messages.`).then(msg => msg.delete(3000))
        }).catch(e => {
            message.reply('I can not delete these messages.')
        })
    }
}

