const {EmbedBuilder: SendEmbed} = require("discord.js");

module.exports = (message, title) => {

    return new SendEmbed()
        .setColor([75, 157, 239])
        .setTitle(title.length < 1 ? 'undefined' : title)
        .setFooter({ text: `Requested by ${message.author.username}` })
}