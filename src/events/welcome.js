const sendTextEmbed = require("../foundations/embed/sendTextEmbed");
const { getGuildOrNull } = require('../foundations/mongo/guildManager')

const add = async (client, member) => {

    const guildId = member.guild.id
    const database = client.db.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrNull(guilds, guildId)

    if (!guild) {
        return
    }

    const welcomeChannelId = guild['welcome_channel']

    if (!welcomeChannelId) {
        return
    }

    const channel = client.channels.cache.get(welcomeChannelId)

    if (!channel) {
        return
    }

    const welcomeMessage = guild['welcome_message_join'] ?? 'Hey ${mention}!'
    const embedText = welcomeMessage.replace('${mention}', `<@${member.user.id}>`)

    sendTextEmbed(channel, `member joined: \`${member.user.username}\``, embedText);

}

const remove = async (client, member) => {
    const guildId = member.guild.id
    const database = client.db.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrNull(guilds, guildId)

    if (!guild) {
        return
    }

    const goodbyeChannelId = guild['welcome_channel']

    if (!goodbyeChannelId) {
        return
    }

    const channel = client.channels.cache.get(goodbyeChannelId)

    if (!channel) {
        return
    }

    const goodbyeMessage = guild['welcome_message_leave'] ?? '**${name}** just left or was kicked.'
    const embedText = goodbyeMessage.replace('${name}', member.user.username)
    sendTextEmbed(channel, `member left: \`${member.user.username}\``, embedText);

}

module.exports = {
    add,
    remove
}