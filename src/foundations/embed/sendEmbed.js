const {EmbedBuilder: SendEmbed} = require("discord.js");

module.exports = (message, title, description) => {

    const embed = new SendEmbed()
        .setColor([75, 157, 239])
        .setTitle(title.length < 1 ? 'undefined' : title)
        .setDescription(description.length < 1 ? 'undefined' : description)
        .setFooter({ text: `Requested by ${message.author.username}` })

    message.channel.send({ embeds: [embed] })
}