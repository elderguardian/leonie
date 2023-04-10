const {PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<mention>',
    'filter': {
        'arguments': {
            min: 1,
            max: 2,
        },
        'sender': [
            PermissionsBitField.Flags.BanMembers
        ],
        'bot': [
            PermissionsBitField.Flags.BanMembers
        ]
    },
    'callback': (client, message, [mention, ...reasons]) => {
        const memberToBan = message.mentions.members.first()

        if (!memberToBan) {
            return message.reply('Please mention a user to ban')
        }

        if (!memberToBan.kickable) {
            return message.reply('This member can not be banned!')
        }

        const reason = reasons.join(' ')

        memberToBan.ban(reason).then(member => {
            message.reply(`${member.user.username} was successfully banned.`)
        }).catch(e => {
            message.reply('Could not ban this user!')
        })
    }
}

