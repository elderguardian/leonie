const {PermissionsBitField} = require("discord.js");

module.exports = {
    'usage': '<mention>',
    'filter': {
        'arguments': {
            min: 1,
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

        const memberToMute = message.mentions.members.first()

        if (!memberToMute) {
            return message.reply('Please mention a user to mute')
        }

        if (memberToMute.roles.cache.find(role => role.name === mutedRole.name)) {
            return message.channel.send('This member is already muted!')
        }

        const reason = reasons.join(' ')

        memberToMute.roles.add(mutedRole).then(member => {
            message.reply(`${member.user.username} was successfully muted.`)
        }).catch(e => {
            message.reply('Could not mute this user!')
        })
    }
}

