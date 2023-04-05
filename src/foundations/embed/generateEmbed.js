const {EmbedBuilder} = require("discord.js");

module.exports = (message, title) => {

    return new EmbedBuilder()
        .setColor([75, 157, 239])
        .setTitle(title.length < 1 ? 'undefined' : title)
        .setFooter({text: `Requested by ${message.author.username}`})
}