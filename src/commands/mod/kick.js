const {PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<mention>',
    'filter': {
        'arguments': {
            min: 1,
            max: 2,
        },
        'sender': [
            PermissionsBitField.Flags.KickMembers
        ],
        'bot': [
            PermissionsBitField.Flags.KickMembers
        ]
    },
    'callback': (client, message, [mention, ...reasons]) => {
        const memberToKick = message.mentions.members.first()

        if (!memberToKick) {
            return message.reply('Please mention a user to kick')
        }

        if (!memberToKick.kickable) {
            return message.reply('This member can not be kicked!')
        }

        const reason = reasons.join(' ')

        memberToKick.kick(reason).then(member => {
            message.reply(`${member.user.username} was successfully kicked.`)
        }).catch(e => {
            message.reply('Could not kick this user!')
        })
    }
}

