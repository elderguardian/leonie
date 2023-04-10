const {PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<mention>',
    'filter': {
        'arguments': {
            min: 1,
            max: 2,
        },
        'sender': [
            PermissionsBitField.Flags.ManageRoles
        ],
        'bot': [
            PermissionsBitField.Flags.ManageRoles
        ]
    },
    'callback': (client, message, [mention, ...reasons]) => {
        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted')

        if (!mutedRole) {
            return message.channel.send('There is no `Muted` role on this server')
        }

        const memberToUnmute = message.mentions.members.first()

        if (!memberToUnmute) {
            return message.reply('Please mention a user to unmute')
        }

        if (!memberToUnmute.roles.cache.find(role => role.name === mutedRole.name)) {
            return message.channel.send('This member is not muted!')
        }

        const reason = reasons.join(' ')

        memberToUnmute.roles.remove(mutedRole).then(member => {
            message.reply(`${member.user.username} was successfully unmuted.`)
        }).catch(e => {
            message.reply('Could not unmute this user!')
        })
    }
}

