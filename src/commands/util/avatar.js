const sendImageEmbed = require('../../foundations/embed/sendImageEmbed')

module.exports = {
    'usage': 'no arguments\nor multiple mention',
    'callback': (client, message, args) => {

        let membersToSend = message.mentions.members.size >= 1
            ? [...message.mentions.members.map(g => g.user)]
            : [message.author]

        for (const member of membersToSend) {
            const username = member.username
            const avatarUrl = member.avatarURL()

            sendImageEmbed(message.channel, `Avatar of \`${username}\``, avatarUrl)
        }
    }
}

