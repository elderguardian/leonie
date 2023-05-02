const sendTextEmbed = require("../foundations/embed/sendTextEmbed");

const add = (client, member) => {

    if (member.guild.id !== client.config.welcome.guildID) {
        return
    }

    const channel = client.channels.cache.get(client.config.welcome.channelID)

    if (!channel) {
        return
    }

    const welcomeMessage = client.config.welcome.messages.welcome
    const embedText = welcomeMessage.replace('${mention}', `<@${member.user.id}>`)
    sendTextEmbed(channel, `member joined: \`${member.user.username}\``, embedText);

}

const remove = (client, member) => {
    if (member.guild.id !== client.config.welcome.guildID) {
        return
    }

    const channel = client.channels.cache.get(client.config.welcome.channelID)

    if (!channel) {
        return
    }

    const goodbyeMessage = client.config.welcome.messages.goodbye
    const embedText = goodbyeMessage.replace('${name-tag}', `${member.user.username}#${member.user.tag}`)
    sendTextEmbed(channel, `member left: \`${member.user.username}\``, embedText);

}

module.exports = {
    add,
    remove
}