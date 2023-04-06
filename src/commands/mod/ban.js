const {Guild, PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<mention>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, [mention, ...reasons]) => {

        const senderPermissions = message.guild.members.resolve(message.author).permissions

        if (!senderPermissions.has(PermissionsBitField.Flags.BanMembers)) {
            message.reply('You can\'t use this command.')
            return
        }

        const botPermissions = message.guild.members.me.permissions

        if (!botPermissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('I am missing the permissions to ban members.')
        }

        const memberToKick = message.mentions.members.first()

        if (!memberToKick) {
            return message.reply('Please mention a user to ban')
        }

        if (!memberToKick.kickable) {
            return message.reply('This member can not be banned!')
        }

        const reason = reasons.join(' ')

        memberToKick.kick(reason).then(member => {
            message.reply(`${member.user.username} was successfully banned.`)
        }).catch(e => {
            message.reply('Could not ban this user!')
        })
    }
}

